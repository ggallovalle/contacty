import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { prismaSrv } from './shared.providers';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [prismaSrv.autoFactory(PrismaService, [])],
  exports: [ConfigModule, prismaSrv.token],
})
export class SharedModule {}
