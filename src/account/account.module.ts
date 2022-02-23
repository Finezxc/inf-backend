import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { UserController } from 'account/account.controller';
import { AccountService } from 'account/services/account.service';
import { UserRepository } from 'account/repositories/user.repository';
import { AuthModule } from 'auth/auth.module';
import { StorageModule } from 'storage/storage.module';
import { MailingModule } from 'mailing/mailing.module';
import { ExpertiseKeywordEntity } from 'db/entities/expertise-keyword.entity';
import { CommonModule } from 'common/common.module';
import { SpecificCategoryRepository } from '../categories/repositories/specific-category.repository';
import { AccountTransformer } from '../transformers/account.transformer';
import { JwtModule } from '@nestjs/jwt';
import { CredentialDocumentTypesModule } from '../credential-document-types/credential-document-types.module';
import { CategoryRepository } from '../categories/repositories/category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      ExpertiseKeywordEntity,
      SpecificCategoryRepository,
      CategoryRepository,
    ]),
    NestjsFormDataModule,
    forwardRef(() => AuthModule),
    StorageModule,
    MailingModule,
    CommonModule,
    CredentialDocumentTypesModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [UserController],
  providers: [AccountService, AccountTransformer],
  exports: [TypeOrmModule.forFeature([UserRepository])],
})
export class AccountModule {}
