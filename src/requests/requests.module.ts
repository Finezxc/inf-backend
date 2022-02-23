import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { RequestsController } from 'requests/requests.controller';
import { RequestsService } from 'requests/service/requests.service';
import { AuthModule } from 'auth/auth.module';
import { ExpertiseKeywordEntity } from 'db/entities/expertise-keyword.entity';
import { CommonModule } from 'common/common.module';
import { RequestRepository } from 'requests/repositories/requests.repository';
import { SpecificCategoryRepository } from 'categories/repositories/specific-category.repository';
import { AdminPaymentSettingsEntity } from 'db/entities/admin-payment-settings.entity';
import { PlatformSettingsEntity } from '../db/entities/platform-settings.entity';
import { CategoryRepository } from '../categories/repositories/category.repository';
import { UsersModule } from '../users/users.module';
import { CitationModule } from '../citations/citation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RequestRepository,
      ExpertiseKeywordEntity,
      AdminPaymentSettingsEntity,
      SpecificCategoryRepository,
      PlatformSettingsEntity,
      CategoryRepository,
    ]),
    NestjsFormDataModule,
    forwardRef(() => AuthModule),
    CommonModule,
    UsersModule,
    CitationModule,
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}
