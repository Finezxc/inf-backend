import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Get } from '@nestjs/common';
import { PaginatedQueryDto } from 'common/dto/paginated-query.dto';
import { RequestsSubmissionDto } from 'requests/dto/requests-submission.dto';
import { RequestsService } from 'requests/service/requests.service';
import { ApiAuth } from 'auth/decorators/api-auth.decorator';
import { UserRoleEnum } from 'common/enums/user-role.enum';
import { UserAuth } from 'auth/decorators/user-auth.decorator';
import { ApprovedRequestResponse } from 'requests/responses/approved-request.response';
import { IdType } from 'common/types/id-type.type';
import { NosisAuthGuard } from '../auth/guards/nosis-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { UserPayload } from '../common/types/user-payload.type';
import { RequestEntity } from '../db/entities/request.entity';
import { RequestDecisionDto } from './dto/request-decision.dto';
import { RequestResponse } from './responses/request.response';

@ApiTags(`requests`)
@Controller('requests')
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @UserAuth(UserRoleEnum.Verifier)
  @Patch('request-decision')
  @ApiOkResponse({ type: RequestResponse })
  decideOnRequestStatus(
    @User() user: UserPayload,
    @Body() requestDecisionDto: RequestDecisionDto,
  ) {
    return this.requestsService.decideOnRequestStatus(requestDecisionDto, user);
  }

  @UseGuards(NosisAuthGuard)
  @ApiAuth()
  @Post()
  @ApiCreatedResponse()
  submitRequest(
    @User() user: UserPayload,
    @Body() requestsSubmissionDto: RequestsSubmissionDto,
  ) {
    return this.requestsService.submitRequest(user, requestsSubmissionDto);
  }

  @UserAuth(UserRoleEnum.Responder)
  @Get('approved-requests')
  @ApiOkResponse()
  async getApprovedRequests(
    @User() user: UserPayload,
    @Query() paginatedQueryDto: PaginatedQueryDto,
  ) {
    return this.requestsService.getApprovedRequests(user.id, paginatedQueryDto);
  }

  @UserAuth(
    UserRoleEnum.Responder || UserRoleEnum.Verifier || UserRoleEnum.Admin,
  )
  @Get('request-info/:id')
  @ApiOkResponse({ type: RequestResponse })
  @UseInterceptors(ClassSerializerInterceptor)
  getRequestInfo(
    @User() user: UserPayload,
    @Param('id') id: IdType,
  ): Promise<RequestResponse> {
    return this.requestsService.getRequestInfo(user.id, id);
  }

  @UserAuth(UserRoleEnum.Verifier)
  @Get('unclaimed-requests')
  @ApiOkResponse({ type: [RequestResponse] })
  getUnclaimedRequests(
    @Query() paginatedQueryDto: PaginatedQueryDto,
  ): Promise<Pagination<ApprovedRequestResponse>> {
    return this.requestsService.getUnclaimedRequests(paginatedQueryDto);
  }

  @UserAuth(UserRoleEnum.Verifier)
  @Get('claimed-requests')
  @ApiOkResponse({ type: [RequestResponse] })
  getClaimedRequestsWithResponses(
    @User() user: UserPayload,
    @Query() paginatedQueryDto: PaginatedQueryDto,
  ): Promise<Pagination<ApprovedRequestResponse>> {
    return this.requestsService.getClaimedRequestsWithResponses(
      user,
      paginatedQueryDto,
    );
  }

  @UserAuth(UserRoleEnum.Verifier)
  @Get('request-info/:id/responses')
  @ApiCreatedResponse()
  getAllRequestResponses(@User() user: UserPayload, @Param('id') id: IdType) {
    return this.requestsService.getAllRequestResponses(user, id);
  }

  @UserAuth(UserRoleEnum.Responder)
  @Get('completed-requests')
  @ApiOkResponse()
  async getCompleted(
    @User() user: UserPayload,
    @Query() paginatedQueryDto: PaginatedQueryDto,
  ) {
    return this.requestsService.getCompletedRequests(
      user.id,
      paginatedQueryDto,
    );
  }

  @UseGuards(NosisAuthGuard)
  @Get()
  getAllRequests(@User() user: UserPayload): Promise<RequestEntity[]> {
    return this.requestsService.getRequests(user.id);
  }

  @UseGuards(NosisAuthGuard)
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  getRequest(
    @User() user: UserPayload,
    @Param('id') id: IdType,
  ): Promise<RequestEntity> {
    return this.requestsService.getRequest(user.id, id);
  }
}
