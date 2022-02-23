import { IdType } from '../../common/types/id-type.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterResponse {
  @ApiProperty()
  @IsString()
  id: IdType;

  @ApiProperty()
  @IsEmail()
  email: string;
}
