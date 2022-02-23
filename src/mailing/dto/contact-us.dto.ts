import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ContactUsDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  message: string;
  @ApiProperty()
  @IsString()
  fullName: string;
}
