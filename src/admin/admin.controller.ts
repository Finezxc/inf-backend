import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserAuth } from '../auth/decorators/user-auth.decorator';
import { UserRoleEnum } from '../common/enums/user-role.enum';
import { BadRequestResponse } from '../app/responses/bad-request.response';
import { AdminService } from './admin.service';
import { IdType } from '../common/types/id-type.type';
import { PlatformSettingsResponse } from './responses/platform-settings.response';
import { UpdateSettingResponse } from './responses/update-setting.response';
import { PlatformSettingsEntity } from '../db/entities/platform-settings.entity';
import { RequestEntity } from '../db/entities/request.entity';
import { RequestsService } from '../requests/service/requests.service';
import { RequestDecisionDto } from '../requests/dto/request-decision.dto';
import { PaginatedQueryDto } from '../common/dto/paginated-query.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SubmittedRequestResponse } from '../requests/responses/submitted-request.response';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { StatusResponse } from '../account/responses/status.response';
import { UserEntity } from '../db/entities/user.entity';
import { User } from '../common/decorators/user.decorator';
import { UserPayload } from '../common/types/user-payload.type';
import { FormDataRequest } from 'nestjs-form-data';
import { ResponseTemplateDto } from './dto/response-template.dto';

@ApiTags(`admin`)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly requestsService: RequestsService,
  ) {}

  @UserAuth(UserRoleEnum.Admin)
  @Patch('request-decision')
  @ApiOkResponse()
  decideOnRequestStatus(
    @Body() requestDecisionDto: RequestDecisionDto,
    @User() user: UserPayload,
  ) {
    return this.requestsService.decideOnRequestStatus(requestDecisionDto, user);
  }

  @UserAuth(UserRoleEnum.Admin)
  @ApiOperation({ summary: 'Get Platform Settings' })
  @ApiOkResponse({ type: [PlatformSettingsResponse] })
  @ApiNotFoundResponse({
    type: BadRequestResponse,
    status: HttpStatus.NOT_FOUND,
  })
  @Get('platform-settings')
  async getPlatformSettings(): Promise<PlatformSettingsEntity[]> {
    return this.adminService.getAllSettings();
  }

  @UserAuth(UserRoleEnum.Admin)
  @ApiOperation({ summary: 'Update Platform Setting' })
  @ApiOkResponse({ type: UpdateSettingResponse })
  @ApiNotFoundResponse({
    type: BadRequestResponse,
    status: HttpStatus.NOT_FOUND,
  })
  @Patch('settings/:id')
  async updateSettingValue(
    @Param('id') id: IdType,
    @Body() body: UpdateSettingDto,
  ): Promise<UpdateSettingResponse> {
    return this.adminService.updateSetting(id, body.value);
  }

  @UserAuth(UserRoleEnum.Admin | UserRoleEnum.Superadmin)
  @Get('submitted-requests')
  @ApiOkResponse()
  async getSubmittedRequests(
    @Query() paginatedQueryDto: PaginatedQueryDto,
  ): Promise<Pagination<SubmittedRequestResponse>> {
    return this.requestsService.getSubmittedRequests(paginatedQueryDto);
  }

  @UserAuth(UserRoleEnum.Admin)
  @Get('requests/:id')
  getRequest(@Param('id') id: IdType): Promise<RequestEntity> {
    return this.requestsService.getRequestById(id);
  }

  @ApiOperation({ summary: 'Get users with low rating' })
  @ApiOkResponse({ type: [UserEntity] })
  @ApiNotFoundResponse({
    type: BadRequestResponse,
    status: HttpStatus.BAD_REQUEST,
  })
  @UserAuth(UserRoleEnum.Admin)
  @Get('users-with-low-rating')
  getUserWithLowRating() {
    return this.adminService.getUsersWithLowRating();
  }

  @ApiOperation({ summary: 'Update User rating' })
  @ApiOkResponse({ type: StatusResponse })
  @ApiNotFoundResponse({
    type: BadRequestResponse,
    status: HttpStatus.BAD_REQUEST,
  })
  @UserAuth(UserRoleEnum.Admin)
  @Patch('update-user-rating/:id')
  updateUserRating(@Param('id') id: IdType): Promise<StatusResponse> {
    return this.adminService.updateUserRating(id);
  }

  @UserAuth(UserRoleEnum.Admin)
  @ApiCreatedResponse({ type: StatusResponse })
  @Post('loading-template-for-response')
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  loadingTemplateForResponse(
    @Body() body: ResponseTemplateDto,
  ): Promise<StatusResponse> {
    return this.adminService.uploadTemplate(body.template);
  }
}
