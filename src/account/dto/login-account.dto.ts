import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

import { IsValidPassword } from 'common/decorators/is-valid-password.decorator';

export class LoginAccountDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsValidPassword()
  password: string;
}
