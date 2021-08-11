type AnyArray<T = any> = Array<T> | ReadonlyArray<T>;

export interface Newable<T> {
  new (...args: any[]): T;
}

export type ContainerTokens<T extends AnyArray> = T['length'] extends 0
  ? never
  : T['length'] extends 1
  ? [TokenHolder<T[0]>]
  : T['length'] extends 2
  ? [TokenHolder<T[0]>, TokenHolder<T[1]>]
  : T['length'] extends 3
  ? [TokenHolder<T[0]>, TokenHolder<T[1]>, TokenHolder<T[2]>]
  : T['length'] extends 4
  ? [TokenHolder<T[0]>, TokenHolder<T[1]>, TokenHolder<T[2]>, TokenHolder<T[3]>]
  : never;

export type Token<T> = string | symbol | Newable<T>;

export const isConstructorToken = (token?: unknown): token is Newable<any> => {
  return (
    (token != null &&
      typeof token === 'function' &&
      token.prototype &&
      token.prototype.constructor) === token
  );
};

export const isNormalToken = (token?: unknown): token is string | symbol => {
  return (
    token != null && (typeof token === 'string' || typeof token === 'symbol')
  );
};

export const isTokenHolder = (token?: any): token is TokenHolder<any> => {
  return (
    token != null &&
    (isNormalToken(token.token) || isConstructorToken(token.token))
  );
};

export class ProvidenceError extends Error {
  name = 'ProvidenceError';
}

export interface TokenHolder<T> {
  token: Token<T>;
}

export interface Providencia<T, TClass, TFactory> extends TokenHolder<T> {
  class(): TClass;

  class(klass: Newable<T>): TClass;

  factory<T1 extends (...args: any[]) => T>(
    factory: T1,
    inject: ContainerTokens<Parameters<T1>>
  ): TFactory;

  autoFactory<T1 extends Newable<T>>(
    klass: T1,
    inject: ContainerTokens<ConstructorParameters<T1>>
  ): TFactory;

  // autoFactory(
  //   inject: ContainerTokens<ConstructorParameters<Newable<T>>>
  // ): TFactory;
}
