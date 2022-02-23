import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsId } from '../../common/decorators/is-id.decorator';
import { Citation } from './citation.dto';
import { Type } from 'class-transformer';
import { IdType } from '../../common/types/id-type.type';

export class CreateResponseAttachmentDocument {
  @ApiProperty()
  @IsId()
  ownership: IdType;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Citation)
  citation: Citation;
}
