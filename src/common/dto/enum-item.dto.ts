import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IdType } from 'common/types/id-type.type';
import { IsId } from 'common/decorators/is-id.decorator';

export class EnumItemDto {
  @ApiProperty()
  @IsId({ nullable: true })
  id?: IdType;

  @ApiProperty()
  @IsString()
  name: string;
}
