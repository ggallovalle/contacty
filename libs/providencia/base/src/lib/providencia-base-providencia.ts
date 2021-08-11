type AnyArray<T = any> = Array<T> | ReadonlyArray<T>;

interface Newable<T> {
  new (...args: any[]): T;
}

type PowerUp<T extends AnyArray> = T['length'] extends 0
  ? never
  : T['length'] extends 1
  ? [AbstractProvidencia<T[0]>]
  : T['length'] extends 2
  ? [AbstractProvidencia<T[0]>, AbstractProvidencia<T[1]>]
  : T['length'] extends 3
  ? [
      AbstractProvidencia<T[0]>,
      AbstractProvidencia<T[1]>,
      AbstractProvidencia<T[2]>
    ]
  : T['length'] extends 4
  ? [
      AbstractProvidencia<T[0]>,
      AbstractProvidencia<T[1]>,
      AbstractProvidencia<T[2]>,
      AbstractProvidencia<T[3]>
    ]
  : never;

type Token<T> = string | symbol | Newable<T>;

export abstract class AbstractProvidencia<T> {
  protected constructor(public readonly token: Token<T>) {}

  public abstract class(klass: Newable<T>): any;

  // public abstract classSingleton(klass: Newable<T>): any;

  // class(klass: Newable<T>): NestClassProvider {
  //   return {
  //     provide: this.token,
  //     useClass: klass,
  //   };
  // }

  public abstract factory<T1 extends (...args: any[]) => T>(
    factory: T1,
    inject: PowerUp<Parameters<T1>>
  ): any;

  // factory<T1 extends (...args: any[]) => T>(
  //   factory: T1,
  //   inject: PowerUp<Parameters<T1>>
  // ): NestFactoryProvider {
  //   return {
  //     provide: this.token,
  //     useFactory: factory,
  //     inject: inject.map((it) => it.token),
  //   };
  // }
}
