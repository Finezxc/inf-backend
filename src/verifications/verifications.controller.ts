import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserAuth } from '../auth/decorators/user-auth.decorator';
import { UserRoleEnum } from '../common/enums/user-role.enum';
import { RequestResponse } from '../requests/responses/answered-request.response';
import { RequestsService } from '../requests/service/requests.service';
import { IdType } from '../common/types/id-type.type';
import { ResponsesService } from '../responses/services/responses.service';
import { PaginatedQueryDto } from '../common/dto/paginated-query.dto';
import { ResponseEntity } from '../db/entities/response.entity';
import { User } from '../common/decorators/user.decorator';
import { UserPayload } from '../common/types/user-payload.type';
import { ResponseDecisionDto } from '../responses/dto/response-decision.dto';
import { StatusResponse } from '../account/responses/status.response';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RequestEntity } from '../db/entities/request.entity';

@ApiTags(`verifications`)
@Controller('verifications')
export class VerificationsController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly responsesService: ResponsesService,
  ) {}

  @UserAuth(UserRoleEnum.Verifier)
  @ApiOkResponse({ type: RequestResponse })
  @Get('available-requests')
  availableRequests(
    @Query() paginatedQueryDto: PaginatedQueryDto,
  ): Promise<Pagination<RequestEntity>> {
    return this.requestsService.availableRequests(paginatedQueryDto);
  }

  @UserAuth(UserRoleEnum.Verifier)
  @ApiOkResponse({ type: RequestResponse })
  @Get('request/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  availableRequest(@Param('id') id: IdType) {
    return this.requestsService.availableRequest(id);
  }

  @UserAuth(UserRoleEnum.Verifier)
  @Get('responses')
  @UseInterceptors(ClassSerializerInterceptor)
  responses(@Query() paginatedQueryDto: PaginatedQueryDto) {
    return this.responsesService.getAllResponses(paginatedQueryDto);
  }

  @UserAuth(UserRoleEnum.Verifier)
  @Get('responses/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  response(@Param('id') id: IdType): Promise<ResponseEntity> {
    return this.responsesService.getResponse(id);
  }

  @UserAuth(UserRoleEnum.Verifier)
  @Post('response-decision')
  @ApiOkResponse()
  async decideOnResponse(
    @User() user: UserPayload,
    @Body() responseDecisionDto: ResponseDecisionDto,
  ): Promise<StatusResponse> {
    return this.responsesService.decideOnResponse(user, responseDecisionDto);
  }
}
