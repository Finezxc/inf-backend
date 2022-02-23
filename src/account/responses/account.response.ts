import { ApiProperty } from '@nestjs/swagger';

import { EnumItemResponse } from 'common/responses/enum-item.response';
import type { IdType } from 'common/types/id-type.type';
import { UserEntity } from 'db/entities/user.entity';

export class AccountResponse {
  @ApiProperty()
  id: IdType;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  jobTitle: string;

  @ApiProperty()
  linkedInProfileUrl?: string;

  @ApiProperty()
  cryptoCurrencyWalledAddress?: string;

  @ApiProperty({ type: [EnumItemResponse], nullable: true })
  expertiseKeywords?: EnumItemResponse[];

  @ApiProperty({ type: [EnumItemResponse], nullable: true })
  roles: EnumItemResponse[];

  static fromUser(user: UserEntity) {
    const {
      id,
      bio,
      email,
      birthDate,
      firstName,
      lastName,
      jobTitle,
      location,
      cryptoCurrencyWalletAddress: cryptoCurrencyWalledAddress,
      expertiseKeywords,
      linkedInProfileUrl,
      roles,
      rating,
      responderCredentialDocuments,
      verifierCredentialDocuments,
      categories,
    } = user;
    return {
      id,
      bio,
      birthDate,
      firstName,
      lastName,
      jobTitle,
      location,
      cryptoCurrencyWalledAddress,
      expertiseKeywords,
      linkedInProfileUrl,
      email,
      roles,
      rating,
      responderCredentialDocuments,
      verifierCredentialDocuments,
      categories,
    };
  }
}
