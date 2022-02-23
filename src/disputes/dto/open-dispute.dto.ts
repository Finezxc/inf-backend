import { ApiProperty } from '@nestjs/swagger';
import { IdType } from '../../common/types/id-type.type';
import { NosisIdType } from '../../common/types/nosis-id.type';
import { IsStringWithDefinedLength } from '../../common/decorators/is-string.decorator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class OpenDisputeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  requesterId: NosisIdType;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  responseId: IdType;

  @ApiProperty()
  @IsStringWithDefinedLength()
  reason: string;

  @ApiProperty()
  @IsStringWithDefinedLength(5, 10000)
  description: string;
}
