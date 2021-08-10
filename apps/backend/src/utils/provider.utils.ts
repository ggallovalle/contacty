import { ClassProvider, FactoryProvider, Scope } from '@nestjs/common';

export const classProvider =
  <T>(token: ClassProvider['provide'], scope?: Scope) =>
  (provider: ClassProvider['useClass']): ClassProvider => ({
    provide: token,
    useClass: provider,
    scope,
  });

export const factoryProvider =
  <T>(token: FactoryProvider['provide'], scope?: Scope) =>
  (
    provider: FactoryProvider<T>['useFactory'],
    inject: FactoryProvider['inject']
  ): FactoryProvider => ({
    provide: token,
    useFactory: provider,
    inject: inject,
    scope,
  });

type Provider<T> = {
  token: ClassProvider['provide'];
  factory: (
    provider: FactoryProvider<T>['useFactory'],
    inject: FactoryProvider['inject']
  ) => FactoryProvider;
  class: (provider: ClassProvider<T>['useClass']) => ClassProvider;
};

export const makeProvider = <T>(
  token: ClassProvider['provide'],
  scope?: Scope
): Provider<T> => {
  return {
    token,
    factory: factoryProvider(token, scope),
    class: classProvider(token, scope),
  };
};
