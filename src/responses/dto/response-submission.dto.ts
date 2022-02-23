import { ApiProperty } from '@nestjs/swagger';
import { IsId } from 'common/decorators/is-id.decorator';

import { IdType } from 'common/types/id-type.type';
import { MemoryStoredFile } from 'nestjs-form-data';
import { ResponseFile } from '../../common/decorators/response-file.decorator';
import { IsArray, IsString } from 'class-validator';

export class CitationField {
  id: IdType;
  value: string;
}

export class Citation {
  @ApiProperty()
  citationId: IdType;
  @ApiProperty()
  citationFields: CitationField[];
}

export class ResponsesSubmissionDto {
  @ApiProperty()
  @IsId()
  requestId: IdType;

  @ApiProperty()
  @ResponseFile()
  attachmentFile: MemoryStoredFile;

  @ApiProperty()
  @IsId()
  justificationId: IdType;

  @ApiProperty()
  @IsArray()
  citations: Citation[];

  @ApiProperty()
  @IsString()
  price: number;
}
