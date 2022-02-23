import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'common/common.module';
import { StorageItemRepository } from 'storage/repositories/storage-item.repository';

import { StorageService } from 'storage/services/storage.service';
import { StorageController } from './storage.controller';
import { ResponderCredentialDocument } from '../db/entities/responder-credential-document.entity';
import { VerifierCredentialDocument } from '../db/entities/verifier-credential-document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StorageItemRepository,
      ResponderCredentialDocument,
      VerifierCredentialDocument,
    ]),
    CommonModule,
  ],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
