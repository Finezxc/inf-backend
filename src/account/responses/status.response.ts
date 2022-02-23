import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class StatusResponse {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
