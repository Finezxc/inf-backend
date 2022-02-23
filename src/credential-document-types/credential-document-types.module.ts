import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CredentialDocumentTypesService } from 'credential-document-types/services/credential-document-types.service';
import { CredentialDocumentTypesController } from 'credential-document-types/credential-document-types.controller';
import { CredentialDocumentTypeEntity } from 'db/entities/credential-document-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CredentialDocumentTypeEntity])],
  controllers: [CredentialDocumentTypesController],
  providers: [CredentialDocumentTypesService],
  exports: [CredentialDocumentTypesService],
})
export class CredentialDocumentTypesModule {}
