import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsUrl,
  ValidateNested,
} from 'class-validator';

import { CreateCredentialDocument } from 'account/dto/create-credential-document.dto';
import { IdType } from 'common/types/id-type.type';
import { IsId } from 'common/decorators/is-id.decorator';

export class VerifierStatusApplicationDto {
  @ApiProperty()
  @IsUrl()
  linkedInProfileUrl: string;

  @ApiProperty({ type: [Number] })
  @IsId({ each: true, nullable: true })
  expertiseKeywordIds: IdType[];

  @ApiProperty({ type: [CreateCredentialDocument] })
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @Type(() => CreateCredentialDocument)
  credentialDocuments: CreateCredentialDocument[];
}
