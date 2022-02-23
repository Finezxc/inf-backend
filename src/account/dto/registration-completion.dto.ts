import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

import { CreateCredentialDocument } from 'account/dto/create-credential-document.dto';
import { IdType } from 'common/types/id-type.type';
import { IsId } from 'common/decorators/is-id.decorator';

export class RegistrationCompletionDto {
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
  linkedInProfileUrl?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  cryptoCurrencyWalletAddress?: string;

  @ApiProperty({ type: [Number] })
  @IsId({ each: true, nullable: true })
  expertiseKeywordIds: IdType[];

  @ApiProperty({ type: [CreateCredentialDocument], nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @ArrayMaxSize(4)
  @Type(() => CreateCredentialDocument)
  credentialDocuments?: CreateCredentialDocument[];

  @ApiProperty()
  categories: [];
}
