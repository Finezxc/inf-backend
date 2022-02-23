import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserAuth } from 'auth/decorators/user-auth.decorator';
import { PaginatedSearchDto } from 'common/dto/paginated-search.dto';
import { UserRoleEnum } from 'common/enums/user-role.enum';
import { WithPaginatedResponse } from 'common/mixins/with-pagination.mixin';
import { IdType } from 'common/types/id-type.type';
import { ResponseType } from 'common/types/response.type';
import { UsersService } from 'users/services/users.service';
import { UsersListResponse } from 'users/responses/users-list.response';
import { UsersInfoResponse } from 'users/responses/user-info.response';
import { BanUserDto } from 'users/dto/ban-user.dto';

@ApiTags(`users`)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':userId/profile-picture')
  @UserAuth()
  async getProfilePicture(
    @Res() response: ResponseType,
    @Param('userId', new ParseIntPipe()) userId: IdType,
  ) {
    return this.usersService.pipeProfilePicture(userId, response);
  }

  @UserAuth(UserRoleEnum.Admin)
  @Get()
  @ApiOkResponse({ type: WithPaginatedResponse(UsersListResponse) })
  @ApiBadRequestResponse()
  async getAllUsers(
    @Query() paginatedSearchDto: PaginatedSearchDto,
  ): Promise<UsersListResponse> {
    return this.usersService.getAllUsers(paginatedSearchDto);
  }

  @UserAuth(UserRoleEnum.Admin)
  @Get(':userId')
  @ApiOkResponse({ type: UsersInfoResponse })
  async getUserInfo(
    @Param('userId') userId: IdType,
  ): Promise<UsersInfoResponse> {
    return this.usersService.getUserInfo(userId);
  }

  @UserAuth(UserRoleEnum.Admin)
  @Post('/ban')
  @ApiOkResponse()
  async banUser(@Body() banUserDto: BanUserDto): Promise<void> {
    return this.usersService.banUser(banUserDto.userId);
  }
}
