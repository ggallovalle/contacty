import {
  ContainerTokens,
  isConstructorToken,
  isTokenHolder,
  Newable,
  ProvidenceError,
  Providencia,
  Token,
} from '@contacty/providencia-base';
import { ClassProvider, FactoryProvider, Injectable } from '@nestjs/common';
import { SCOPE_OPTIONS_METADATA } from '@nestjs/common/constants';

const factoryErrorMsg = (klass, inject) =>
  `"klass" not provided and token isn't a constructor,
          token: ${klass.name ?? `(${typeof klass}) ${JSON.stringify(klass)}`}
          inject: ${JSON.stringify(inject)}`;

const classErrorMsg = (klass) =>
  `"klass" not provided and token isn't a constructor,
          token: ${
            klass?.name ?? `(${typeof klass}) ${JSON.stringify(klass)}`
          }`;

const classNotAnnotatedMsg = (klass) =>
  `"klass" not annotated with @Injectable at definition time,
          token: ${
            klass?.name ?? `(${typeof klass}) ${JSON.stringify(klass)}`
          }`;

export class ProvidenciaNestjs<T = unknown>
  implements Providencia<T, ClassProvider, FactoryProvider>
{
  constructor(public token: Token<T>) {}

  class(): ClassProvider<any>;
  class(klass: Newable<T>): ClassProvider<any>;
  class(klass?: any): ClassProvider<any> {
    // if klass not provided and token is a constructor token,
    //  make the assumption that you want to inject the same class
    // TODO in the current state of things, the injectable decorator
    //  only works if is specified in the actual declaration of the class
    //  which makes it more framework dependant
    if (isConstructorToken(this.token) && klass == null) {
      // Injectable()(this.token);
      if (!Reflect.hasMetadata(SCOPE_OPTIONS_METADATA, this.token)) {
        throw new ProvidenceError(classNotAnnotatedMsg(this.token));
      }
      return {
        provide: this.token,
        useClass: this.token,
      };
    } else if (isConstructorToken(klass)) {
      // Injectable()(klass);
      if (!Reflect.hasMetadata(SCOPE_OPTIONS_METADATA, klass)) {
        throw new ProvidenceError(classNotAnnotatedMsg(klass));
      }
      return {
        provide: this.token,
        useClass: klass,
      };
    } else {
      // error
      throw new ProvidenceError(classErrorMsg(this.token));
    }
  }

  factory<T1 extends (...args: any[]) => T>(
    factory: T1,
    inject: ContainerTokens<Parameters<T1>>
  ): FactoryProvider {
    return {
      provide: this.token,
      useFactory: factory,
      inject: inject.map((it) => it.token),
    };
  }

  autoFactory<T1 extends Newable<T>>(
    klass: T1,
    inject: ContainerTokens<ConstructorParameters<T1>>
  ): FactoryProvider {
    if (isConstructorToken(klass) && inject.every(isTokenHolder)) {
      return {
        provide: this.token,
        useFactory: (...args) => {
          return new klass(...args);
        },
        inject: inject.map((it) => it.token),
      };
    } else {
      throw new ProvidenceError(factoryErrorMsg(klass, inject));
    }
  }

  // // autoFactory<T1 extends Newable<T>>(
  // //   klass: T1,
  // //   inject: ContainerTokens<ConstructorParameters<T1>>
  // // ): FactoryProvider;
  // // autoFactory(
  // //   inject: ContainerTokens<ConstructorParameters<Newable<T>>>
  // // ): FactoryProvider;
  // autoFactory<T1 extends Newable<T> = Newable<T>>(
  //   // ...args:
  //   //   | [klass: T1, inject: ContainerTokens<ConstructorParameters<T1>>]
  //   //   | [inject: ContainerTokens<ConstructorParameters<T1>>]
  // ): // klass: T1,
  // // inject: ContainerTokens<ConstructorParameters<T1>>
  // FactoryProvider {
  //
  // NOTE can't correctly type hint based on the token

  //   // if klass not provided and token is a constructor token,
  //   //  make the assumption that you want to autoFactory the token constructor.
  //   if (isConstructorToken(klass) && Array.isArray(inject)) {
  //   return {
  //   provide: this.token,
  //   useFactory: (...args) => {
  //     return new klass(...args);
  //   },
  //   inject: inject.map((it) => it.token),
  // };
  // } else if (Array.isArray(klass) && isConstructorToken(this.token)) {
  //   return {
  //     provide: this.token,
  //     useFactory: (...args) => {
  //       return new (this.token as unknown as any)(...args);
  //     },
  //     inject: klass.map((it) => it.token),
  //   };
  // } else {
  //   throw new ProvidenceError(
  //     `"klass" not provided and token isn't a constructor, token: ${this.token.toString()}`
  //   );
  // }
  // }
}
