import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CredentialDocumentTypeEntity } from 'db/entities/credential-document-type.entity';
import { ArrayResponse } from 'common/responses/array.response';

@Injectable()
export class CredentialDocumentTypesService {
  constructor(
    @InjectRepository(CredentialDocumentTypeEntity)
    private credentialDocumentTypesRepo: Repository<CredentialDocumentTypeEntity>,
  ) {}

  async getCredentialDocumentTypes(): Promise<
    ArrayResponse<CredentialDocumentTypeEntity>
  > {
    const items = await this.credentialDocumentTypesRepo.find();
    return { items };
  }

  async getCredentialDocumentById(
    id: number,
  ): Promise<CredentialDocumentTypeEntity> {
    return this.credentialDocumentTypesRepo.findOneOrFail(id);
  }
}
