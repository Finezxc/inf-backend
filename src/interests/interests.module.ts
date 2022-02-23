import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { InterestRepository } from 'interests/repositories/interest.repository';
import { InterestsController } from 'interests/controllers/interest.controller';
import { InterestService } from 'interests/services/interest.service';
import { EvaluationRequestInterestController } from 'interests/controllers/evaluation-request-interests.controller';
import { EvaluationRequestInterestService } from 'interests/services/evaluation-request-interests.service';
import { EvaluationRequestInterestRepository } from 'interests/repositories/evaluation-request-interest.repository';
import { CategoryRepository } from 'categories/repositories/category.repository';
import { CommonModule } from 'common/common.module';
import { StorageModule } from 'storage/storage.module';
import { MailingModule } from 'mailing/mailing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InterestRepository,
      EvaluationRequestInterestRepository,
      CategoryRepository,
    ]),
    NestjsFormDataModule,
    CommonModule,
    StorageModule,
    MailingModule,
  ],
  controllers: [InterestsController, EvaluationRequestInterestController],
  providers: [InterestService, EvaluationRequestInterestService],
})
export class InterestsModule {}
