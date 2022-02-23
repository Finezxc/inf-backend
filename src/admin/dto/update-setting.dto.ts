import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSettingDto {
  @ApiProperty()
  @IsNumber()
  value: number;
}
