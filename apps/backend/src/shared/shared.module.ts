import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { PrismaService } from './prisma.service';

const modules = [ConfigModule];
const services = [PrismaService];

const combined = [...modules, ...services];

@Global()
@Module({
  imports: combined,
  providers: services,
  exports: combined,
})
export class SharedModule {}
