import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { MemoryStoredFile } from 'nestjs-form-data';

import { CreateCredentialDocument } from 'account/dto/create-credential-document.dto';
import { IdType } from 'common/types/id-type.type';
import { IsId } from 'common/decorators/is-id.decorator';
import { IsImageFile } from 'common/decorators/is-image-file.decorator';

export class UpdateUserProfileDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  jobTitle: string;

  @ApiProperty({ nullable: true })
  @IsUrl()
  @IsOptional()
  linkedInProfileUrl?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  cryptoCurrencyWalletAddress?: string;

  @ApiProperty({ type: [Number] })
  @IsId({ each: true, nullable: true })
  expertiseKeywordIds: IdType[];

  @ApiProperty({ type: [CreateCredentialDocument], nullable: true })
  @ValidateNested({ each: true })
  @Type(() => CreateCredentialDocument)
  credentialDocuments?: CreateCredentialDocument[];

  @IsImageFile({ nullable: false })
  profilePictureFile?: MemoryStoredFile;
}
