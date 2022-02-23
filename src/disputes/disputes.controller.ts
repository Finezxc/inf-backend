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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ApiAuth } from '../auth/decorators/api-auth.decorator';
import { OpenDisputeDto } from './dto/open-dispute.dto';
import { DisputesService } from './services/disputes.service';
import { UserRoleEnum } from '../common/enums/user-role.enum';
import { UserAuth } from '../auth/decorators/user-auth.decorator';
import { PaginatedQueryDto } from '../common/dto/paginated-query.dto';
import { DisputeDecisionDto } from './dto/dispute-decision.dto';
import { User } from '../common/decorators/user.decorator';
import { UserPayload } from '../common/types/user-payload.type';
import { DisputeEntity } from '../db/entities/dispute.entity';
import { DisputeResponses } from './responses/dispute.responses';
import { BadRequestResponse } from '../app/responses/bad-request.response';
import { IdType } from '../common/types/id-type.type';

@ApiTags(`disputes`)
@Controller('disputes')
export class DisputesController {
  constructor(private disputesService: DisputesService) {}

  @ApiAuth()
  @Post()
  @ApiCreatedResponse({ type: DisputeResponses })
  @ApiNotFoundResponse({
    type: BadRequestResponse,
    status: HttpStatus.NOT_FOUND,
  })
  async openDispute(
    @Body() openDisputeDto: OpenDisputeDto,
  ): Promise<DisputeEntity> {
    return this.disputesService.openDispute(openDisputeDto);
  }

  @UserAuth(UserRoleEnum.Admin)
  @Get('not-reviewed-disputes')
  @ApiOkResponse({ type: [DisputeResponses] })
  async getNotReviewedDisputes(@Query() paginatedQueryDto: PaginatedQueryDto) {
    return this.disputesService.getNotReviewedDisputes(paginatedQueryDto);
  }

  @ApiAuth()
  @Get(':id')
  @ApiOkResponse()
  async getDispute(@Param('id') id: IdType): Promise<DisputeEntity> {
    return this.disputesService.getDispute(id);
  }

  @UserAuth(UserRoleEnum.Admin)
  @Patch('dispute-decision')
  @ApiOkResponse()
  async decideOnDispute(
    @User() user: UserPayload,
    @Body() disputeDecisionDto: DisputeDecisionDto,
  ) {
    return this.disputesService.decideOnDispute(user, disputeDecisionDto);
  }
}
