import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from 'account/repositories/user.repository';
import { SessionsService } from 'auth/services/sessions.service';
import { ResponderCredentialDocument } from 'db/entities/responder-credential-document.entity';
import { VerifierCredentialDocument } from 'db/entities/verifier-credential-document.entity';
import { MailingModule } from 'mailing/mailing.module';
import { StorageModule } from 'storage/storage.module';
import { UsersService } from 'users/services/users.service';
import { UsersController } from 'users/users.controller';
import { CredentialDocumentTypesModule } from '../credential-document-types/credential-document-types.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, SessionsService],
  imports: [
    StorageModule,
    TypeOrmModule.forFeature([
      UserRepository,
      ResponderCredentialDocument,
      VerifierCredentialDocument,
    ]),
    MailingModule,
    CredentialDocumentTypesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
