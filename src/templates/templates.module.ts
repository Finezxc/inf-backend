import { Module } from '@nestjs/common';

import { TemplatesService } from './services/templates.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
