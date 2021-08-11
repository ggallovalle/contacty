import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { prismaSrv } from './shared.providers';

const modules = [ConfigModule];
const services = [prismaSrv.class()];

const combined = [...modules, ...services];

@Global()
@Module({
  imports: modules,
  providers: services,
  exports: combined,
})
export class SharedModule {}
