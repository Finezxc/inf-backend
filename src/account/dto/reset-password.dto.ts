import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IsValidPassword } from 'common/decorators/is-valid-password.decorator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  confirmationToken: string;

  @ApiProperty()
  @IsValidPassword()
  newPassword: string;
}
