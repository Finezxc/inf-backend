import { IdType } from '../../common/types/id-type.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsId } from '../../common/decorators/is-id.decorator';
import { IsNumber, IsString } from 'class-validator';

export class PlatformSettingsResponse {
  @ApiProperty()
  @IsId()
  id: IdType;

  @ApiProperty()
  @IsString()
  customization: string;

  @ApiProperty()
  @IsNumber()
  value: number;
}
