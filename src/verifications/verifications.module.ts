import { Module } from '@nestjs/common';
import { VerificationsController } from './verifications.controller';
import { RequestsModule } from '../requests/requests.module';
import { ResponsesModule } from '../responses/responses.module';

@Module({
  imports: [RequestsModule, ResponsesModule],
  controllers: [VerificationsController],
  providers: [],
})
export class VerificationsModule {}
