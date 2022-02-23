import { IsEnum, IsString } from 'class-validator';
import { MemoryStoredFile } from 'nestjs-form-data';
import { ApiProperty } from '@nestjs/swagger';

import { IsId } from 'common/decorators/is-id.decorator';
import { CredentialDocumentTypeEnum } from 'common/enums/credential-document-type.enum';
import { ConfirmationDocumentFile } from 'common/decorators/confirmation-document-file.decorator';

export class CreateCredentialDocument {
  @IsId()
  @ApiProperty()
  @IsEnum(CredentialDocumentTypeEnum)
  documentTypeId: CredentialDocumentTypeEnum;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @ConfirmationDocumentFile()
  file: MemoryStoredFile;
}
