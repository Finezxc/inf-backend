import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IdType } from '../../common/types/id-type.type';
import { NosisIdType } from '../../common/types/nosis-id.type';

export class CreateCommentDto {
  @ApiProperty()
  disputeId: IdType;

  @ApiProperty()
  @IsNotEmpty()
  userId: IdType;

  @ApiProperty()
  @IsNotEmpty()
  requesterId: NosisIdType;

  @ApiProperty()
  body: string;
}
