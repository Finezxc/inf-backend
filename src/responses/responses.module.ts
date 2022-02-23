import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { ResponsesController } from 'responses/responses.controller';
import { ResponsesService } from 'responses/services/responses.service';
import { AuthModule } from 'auth/auth.module';
import { ExpertiseKeywordEntity } from 'db/entities/expertise-keyword.entity';
import { CommonModule } from 'common/common.module';
import { RequestRepository } from 'requests/repositories/requests.repository';
import { SpecificCategoryRepository } from 'categories/repositories/specific-category.repository';
import { AdminPaymentSettingsEntity } from 'db/entities/admin-payment-settings.entity';
import { ResponseRepository } from 'responses/repositories/response.repository';
import { StorageModule } from 'storage/storage.module';
import { VerificationEntity } from 'db/entities/verification.entity';
import { UserRepository } from 'account/repositories/user.repository';
import { ResponseAttachmentDocumentRepository } from './repositories/response-attachment-document.repository';
import { ResponseTemplateRepository } from './repositories/response-template.repository';
import { PlatformSettingsRepository } from '../admin/repositories/platform-settings.repository';
import { ResponseOwnershipTypesModule } from '../response-ownership-types/response-ownership-types.module';
import { CitationTypesModule } from '../citation-types/citation-types.module';
import { CitationModule } from '../citations/citation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResponseRepository,
      RequestRepository,
      ExpertiseKeywordEntity,
      AdminPaymentSettingsEntity,
      SpecificCategoryRepository,
      VerificationEntity,
      UserRepository,
      ResponseAttachmentDocumentRepository,
      ResponseTemplateRepository,
    ]),
    ResponseOwnershipTypesModule,
    NestjsFormDataModule,
    forwardRef(() => AuthModule),
    CommonModule,
    StorageModule,
    CitationTypesModule,
    TypeOrmModule.forFeature([PlatformSettingsRepository]),
    CitationModule,
  ],
  controllers: [ResponsesController],
  providers: [ResponsesService],
  exports: [ResponsesService],
})
export class ResponsesModule {}
