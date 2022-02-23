import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class BadRequestResponse {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsBoolean()
  isNotHumanreadable: boolean;
}
