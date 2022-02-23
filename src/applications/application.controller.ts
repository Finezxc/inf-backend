import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

import { UserAuth } from 'auth/decorators/user-auth.decorator';
import { ApplicationService } from 'applications/services/application.service';
import { VerifierStatusApplicationDto } from 'applications/dto/application-for-verifier-status.dto';
import { UserRoleEnum } from 'common/enums/user-role.enum';
import { VerifierApplicationResponse } from 'applications/responses/verifier-application.response';
import { PaginatedQueryDto } from 'common/dto/paginated-query.dto';
import { VerifierStatusDecisionDto } from 'applications/dto/decision-verifier-status.dto';
import { IdType } from '../common/types/id-type.type';
import { VerifierInfoResponse } from './responses/verifier-info.response';
import { BadRequestResponse } from '../app/responses/bad-request.response';
import { User } from '../common/decorators/user.decorator';
import { UserPayload } from '../common/types/user-payload.type';
import { StatusResponse } from '../account/responses/status.response';
import { UserEntity } from '../db/entities/user.entity';

@ApiTags(`application`)
@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @UserAuth(UserRoleEnum.Responder)
  @Post('verifier-status-application')
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  applyForVerifierStatus(
    @User() user: UserPayload,
    @Body() verifierStatusApplicationDto: VerifierStatusApplicationDto,
  ): Promise<Record<string, number>> {
    return this.applicationService.applyForVerifierStatus(
      user.id,
      verifierStatusApplicationDto,
    );
  }

  @UserAuth(UserRoleEnum.Admin)
  @Get('verifier-applications')
  @ApiOkResponse()
  async getVerifierApplications(
    @Query() paginatedQueryDto: PaginatedQueryDto,
  ): Promise<Pagination<VerifierApplicationResponse>> {
    return this.applicationService.getVerifierApplications(paginatedQueryDto);
  }

  @UserAuth(UserRoleEnum.Admin)
  @ApiOperation({ summary: 'Get Verifier Info By Id' })
  @ApiOkResponse({ type: VerifierInfoResponse })
  @ApiNotFoundResponse({
    type: BadRequestResponse,
    status: HttpStatus.NOT_FOUND,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('verifier-info/:id')
  async getVerifierInfo(@Param('id') id: IdType): Promise<UserEntity> {
    return this.applicationService.verifierInfo(id);
  }

  @UserAuth(UserRoleEnum.Admin | UserRoleEnum.Verifier)
  @Patch('verifier-application-decision')
  @ApiOkResponse()
  async decideOnVerifierStatus(
    @Body() verifierDecisionDto: VerifierStatusDecisionDto,
  ): Promise<StatusResponse> {
    return this.applicationService.decideOnVerifierStatus(verifierDecisionDto);
  }
}
