import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { ApplicationController } from 'applications/application.controller';
import { UserRepository } from 'account/repositories/user.repository';
import { AuthModule } from 'auth/auth.module';
import { StorageModule } from 'storage/storage.module';
import { ExpertiseKeywordEntity } from 'db/entities/expertise-keyword.entity';
import { CommonModule } from 'common/common.module';
import { ApplicationService } from 'applications/services/application.service';
import { MailingModule } from 'mailing/mailing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, ExpertiseKeywordEntity]),
    NestjsFormDataModule,
    forwardRef(() => AuthModule),
    StorageModule,
    CommonModule,
    MailingModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [TypeOrmModule.forFeature([UserRepository])],
})
export class ApplicationModule {}
