import { Entity } from 'typeorm';

import { BaseEnumEntity } from 'db/entities/base-enum.entity';
import { CredentialDocumentTypeEnum } from 'common/enums/credential-document-type.enum';

@Entity({ name: 'credential_document_types' })
export class CredentialDocumentTypeEntity extends BaseEnumEntity<CredentialDocumentTypeEnum> {}
