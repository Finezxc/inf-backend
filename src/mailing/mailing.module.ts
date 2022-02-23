import { Module } from '@nestjs/common';

import { TemplatesModule } from 'templates/templates.module';
import { MailingController } from 'mailing/mailing.controller';
import { MailingService } from 'mailing/services/mailing.service';

@Module({
  imports: [TemplatesModule],
  controllers: [MailingController],
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {}
