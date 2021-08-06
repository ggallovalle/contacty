import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from '../contacts/contacts.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SharedModule, ContactsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
