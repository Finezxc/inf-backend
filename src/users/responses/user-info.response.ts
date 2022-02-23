import { ApiProperty } from '@nestjs/swagger';
import { IdType } from 'common/types/id-type.type';
import { ExpertiseKeywordEntity } from 'db/entities/expertise-keyword.entity';
import { ResponderCredentialDocument } from 'db/entities/responder-credential-document.entity';
import { StorageItemEntity } from 'db/entities/storage-item.entity';
import { UserRoleEntity } from 'db/entities/user-role.entity';

import { UserEntity } from 'db/entities/user.entity';
import { VerifierCredentialDocument } from 'db/entities/verifier-credential-document.entity';

export class UsersInfoResponse {
  @ApiProperty()
  id: IdType;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  location?: string;

  @ApiProperty()
  roles: UserRoleEntity[];

  @ApiProperty()
  responderCredentialDocuments?: ResponderCredentialDocument[];

  @ApiProperty()
  verifierCredentialDocuments?: VerifierCredentialDocument[];

  @ApiProperty()
  linkedInProfileUrl?: string;

  @ApiProperty()
  jobTitle?: string;

  @ApiProperty()
  expertiseKeywords?: ExpertiseKeywordEntity[];

  @ApiProperty()
  cryptoCurrencyWalletAddress?: string;

  @ApiProperty()
  profilePicture?: StorageItemEntity;

  @ApiProperty()
  bio?: string;

  @ApiProperty()
  static fromUser(user: UserEntity) {
    const {
      firstName,
      lastName,
      roles,
      profilePicture,
      id,
      bio,
      cryptoCurrencyWalletAddress,
      expertiseKeywords,
      jobTitle,
      linkedInProfileUrl,
      verifierCredentialDocuments,
      responderCredentialDocuments,
      location,
      email,
    } = user;
    return {
      firstName,
      lastName,
      roles,
      profilePicture,
      id,
      bio,
      cryptoCurrencyWalletAddress,
      expertiseKeywords,
      jobTitle,
      linkedInProfileUrl,
      verifierCredentialDocuments,
      responderCredentialDocuments,
      location,
      email,
    };
  }
}
