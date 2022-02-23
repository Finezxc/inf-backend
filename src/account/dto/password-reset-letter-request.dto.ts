import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class PasswordResetLetterRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
