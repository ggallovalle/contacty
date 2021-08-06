import { ClassProvider, Scope, Type } from '@nestjs/common';

export const classProvider =
  <T>(token: string | symbol, scope?: Scope) =>
  (provider: Type<T>): ClassProvider => ({
    provide: token,
    useClass: provider,
    scope,
  });
