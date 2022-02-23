import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginatedQueryDto } from 'common/dto/paginated-query.dto';
import { UserRoleEnum } from 'common/enums/user-role.enum';
import { UserAuth } from 'auth/decorators/user-auth.decorator';
import { ResponsesService } from 'responses/services/responses.service';
import { ResponsesSubmissionDto } from 'responses/dto/response-submission.dto';
import { IdType } from 'common/types/id-type.type';
import { ResponseOfResponderResponse } from 'responses/responses/get-all-responses.response';
import { ResponseType } from 'common/types/response.type';
import { ResponseRatingDto } from 'responses/dto/response-rating.dto';
import { WithPaginatedResponse } from '../common/mixins/with-pagination.mixin';
import { ResponseUploadTemplateDto } from './dto/response-upload-template.dto';
import { User } from '../common/decorators/user.decorator';
import { UserPayload } from '../common/types/user-payload.type';
import { UserRatingGuard } from '../auth/guards/user-rating.guard';
import { ResponseEntity } from '../db/entities/response.entity';
import { ResponseResponse } from './responses/response.response';

@ApiTags(`responses`)
@Controller('responses')
export class ResponsesController {
  constructor(private responsesService: ResponsesService) {}

  @Get('response-form')
  responseForm() {
    return this.responsesService.responseFormFields();
  }

  @UseGuards(UserRatingGuard)
  @UserAuth(UserRoleEnum.Responder)
  @Post()
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: ResponseResponse })
  submitResponse(
    @User() user: UserPayload,
    @Body() responsesSubmissionDto: ResponsesSubmissionDto,
  ): Promise<ResponseEntity> {
    return this.responsesService.submitResponse(user, responsesSubmissionDto);
  }

  @UserAuth(UserRoleEnum.Responder)
  @Get()
  @ApiOkResponse({ type: WithPaginatedResponse(ResponseOfResponderResponse) })
  getAllResponderResponses(
    @User() user: UserPayload,
    @Query() paginatedQueryDto: PaginatedQueryDto,
  ): Promise<Pagination<ResponseOfResponderResponse>> {
    return this.responsesService.getAllResponderResponses(
      user,
      paginatedQueryDto,
    );
  }

  @UserAuth(
    UserRoleEnum.Responder || UserRoleEnum.Verifier || UserRoleEnum.Admin,
  )
  @Get('/template-download')
  @ApiOkResponse()
  async downloadResponseTemplate(@Res() response: ResponseType): Promise<void> {
    await this.responsesService.downloadResponseTemplate(response);
  }

  // TODO: Temporary added ability to upload response template to all users for testing. Remove it later
  @UserAuth(
    UserRoleEnum.Responder || UserRoleEnum.Verifier || UserRoleEnum.Admin,
  )
  @Post('/template/upload')
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse()
  async uploadResponseTemplate(
    @Body() responseUploadTemplateDto: ResponseUploadTemplateDto,
  ): Promise<void> {
    await this.responsesService.uploadResponseTemplate(
      responseUploadTemplateDto,
    );
  }

  @UserAuth(UserRoleEnum.Responder || UserRoleEnum.Verifier)
  @Get('/:id')
  @ApiOkResponse({ type: ResponseResponse })
  @UseInterceptors(ClassSerializerInterceptor)
  getResponseInfo(@User() user: UserPayload, @Param('id') id: IdType) {
    return this.responsesService.getResponseInfo(user.id, id);
  }

  @UserAuth(UserRoleEnum.Responder || UserRoleEnum.Verifier)
  @Get('/:id/download')
  @ApiCreatedResponse()
  async downloadResponseAttachment(
    @User() user: UserPayload,
    @Param('id') id: IdType,
    @Res() response: ResponseType,
  ) {
    await this.responsesService.downloadResponseAttachment(
      user.id,
      id,
      response,
    );
  }

  @UserAuth(
    UserRoleEnum.Responder || UserRoleEnum.Verifier || UserRoleEnum.Admin,
  )
  @UserAuth()
  @Post('rate-response')
  @ApiCreatedResponse()
  async rateResponse(
    @Body() responseRatingDto: ResponseRatingDto,
  ): Promise<void> {
    await this.responsesService.rateResponse(responseRatingDto);
  }
}
