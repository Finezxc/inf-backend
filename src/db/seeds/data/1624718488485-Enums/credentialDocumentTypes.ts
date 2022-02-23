import type { CredentialDocumentTypeEntity } from 'db/entities/credential-document-type.entity';

export const credentialDocumentTypes: Array<
  Partial<CredentialDocumentTypeEntity> & { name: string }
> = [
  {
    id: 1,
    name: 'Degree certificate, diploma or other education document',
  },
  {
    id: 2,
    name: 'ID document (passport, driving license) and a photo of the applicant holding it',
  },
  {
    id: 3,
    name: 'Employment verification letter, contract or other document verifying employment',
  },
];
