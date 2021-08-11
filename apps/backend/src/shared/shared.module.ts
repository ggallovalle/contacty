import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { prismaSrv } from './shared.providers';
import { PrismaService } from './prisma.service';

const modules = [ConfigModule];
const services = [
  // prismaSrv.class() // TODO improve
  prismaSrv.autoFactory(PrismaService, []),
];

const combined = [...modules, ...services];

@Global()
@Module({
  imports: modules,
  providers: services,
  exports: combined,
})
export class SharedModule {}
