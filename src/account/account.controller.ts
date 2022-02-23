import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UserAuth } from 'auth/decorators/user-auth.decorator';
import { SessionType } from 'common/types/session.type';
import { SessionParam } from 'auth/decorators/session-param.decorator';
import {
  LoginAccountDto,
  RegisterAccountDto,
  RegistrationCompletionDto,
  ResetPasswordDto,
} from 'account/dto';
import { AccountService } from 'account/services/account.service';
import { AccountResponse } from 'account/responses/account.response';
import { PasswordResetLetterRequestDto } from 'account/dto/password-reset-letter-request.dto';
import { IdType } from '../common/types/id-type.type';
import { RegisterResponse } from './responses/register.response';
import { StatusResponse } from './responses/status.response';
import { AccountTransformer } from '../transformers/account.transformer';
import { User } from '../common/decorators/user.decorator';
import { UserPayload } from '../common/types/user-payload.type';
import { RegistrationCompletionResponse } from './responses/registration-completion.response';
import { UpdateUserProfileDto } from './dto/update-user-profile-dto';
import { EnumItemResponse } from '../common/responses/enum-item.response';

@ApiTags(`account`)
@Controller('account')
export class UserController {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountTransformer: AccountTransformer,
  ) {}

  @UserAuth()
  @ApiOkResponse({ type: AccountResponse })
  @Get('current')
  getCurrentUser(@User() user: UserPayload): Promise<AccountResponse> {
    return this.accountService.getCurrentUser(user);
  }

  @Post('register')
  @ApiCreatedResponse({ type: RegisterResponse })
  registerUser(
    @Body() registerUserDto: RegisterAccountDto,
  ): Promise<{ id: IdType; email: string }> {
    return this.accountService.registerUser(registerUserDto);
  }

  @UserAuth()
  @Post('registration-completion')
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiCreatedResponse({ type: RegistrationCompletionResponse })
  async completeRegistration(
    @User() user: UserPayload,
    @Body() registrationCompletionDto: RegistrationCompletionDto,
  ): Promise<RegistrationCompletionResponse> {
    return this.accountTransformer.transform(
      await this.accountService.completeRegistration(
        user.id,
        registrationCompletionDto,
      ),
    );
  }

  @Patch('confirm-email/:confirmationToken')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: StatusResponse })
  confirmUserEmail(
    @Param('confirmationToken') confirmationToken: string,
  ): Promise<Record<string, string>> {
    return this.accountService.confirmUserEmail(confirmationToken);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({ type: AccountResponse })
  @ApiForbiddenResponse()
  @ApiBody({ type: LoginAccountDto })
  login(
    @Body() loginUserDto: LoginAccountDto,
  ): Promise<Record<string, string>> {
    return this.accountService.login(loginUserDto);
  }

  @Delete('logout')
  @ApiOkResponse()
  @UserAuth()
  logout(@SessionParam() session: SessionType): StatusResponse {
    this.accountService.logout(session);
    return { status: true };
  }

  @Post('password-reset-letter')
  @ApiCreatedResponse({ type: StatusResponse })
  requestPasswordResetLetter(
    @Body() passwordResetLetterRequestDto: PasswordResetLetterRequestDto,
  ): Promise<Record<string, boolean>> {
    return this.accountService.requestPasswordRestLetter(
      passwordResetLetterRequestDto.email,
    );
  }

  @Post('reset-password')
  @ApiBody({ type: ResetPasswordDto })
  @ApiCreatedResponse({ type: StatusResponse })
  @ApiBadRequestResponse()
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<Record<string, boolean>> {
    return this.accountService.resetPassword(resetPasswordDto);
  }

  @UserAuth()
  @Patch('profile')
  @ApiOkResponse({ type: AccountResponse })
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  updateProfile(
    @User() user: UserPayload,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<AccountResponse> {
    return this.accountService.updateProfile(user.id, updateUserProfileDto);
  }

  @UserAuth()
  @Get('current/roles')
  @ApiOkResponse({ type: [EnumItemResponse] })
  getCurrentRoles(@User() user: UserPayload): Promise<EnumItemResponse[]> {
    return this.accountService.getCurrentRoles(user);
  }
}
