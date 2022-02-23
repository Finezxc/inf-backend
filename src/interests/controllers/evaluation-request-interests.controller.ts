import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  Response,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

import { EvaluationRequestInterestService } from 'interests/services/evaluation-request-interests.service';
import { CreateEvaluationRequestInterestDto } from 'interests/dto/create-evaluation-request-interest.dto';
import { CreateEvaluationRequestInterestResponse } from 'interests/responses/create-evaluation-request-interest.response';
import { FormDataRequest } from 'nestjs-form-data';
import { LeaderBoardResponse } from 'interests/responses/leader-board.response';
import { ResponseType } from 'common/types/response.type';
import { IdType } from 'common/types/id-type.type';

@ApiTags(`Evaluation Request Interests`)
@Controller('evaluation-request-interests')
export class EvaluationRequestInterestController {
  constructor(
    private readonly evaluationRequestsInterestsService: EvaluationRequestInterestService,
  ) {}

  @ApiCreatedResponse({ type: CreateEvaluationRequestInterestResponse })
  @Post()
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  create(
    @Body() body: CreateEvaluationRequestInterestDto,
  ): Promise<CreateEvaluationRequestInterestResponse> {
    return this.evaluationRequestsInterestsService.create(body);
  }

  @Get('leader-board')
  @ApiOkResponse({ type: LeaderBoardResponse })
  async getLeaderBoard(): Promise<LeaderBoardResponse> {
    return await this.evaluationRequestsInterestsService.getLeaderBoard();
  }

  @Get(':evaluationRequestInterestId/images/:storageItemId')
  @ApiExcludeEndpoint()
  async pipeEvaluationRequestInterestImage(
    @Res() response: ResponseType,
    @Param('evaluationRequestInterestId', new ParseIntPipe())
    evaluationRequestInterestId: IdType,
    @Param('storageItemId', new ParseIntPipe())
    storageItemId: IdType,
  ): Promise<void> {
    return await this.evaluationRequestsInterestsService.pipeEvaluationRequestInterestImage(
      evaluationRequestInterestId,
      storageItemId,
      response,
    );
  }

  @Get('/csv')
  @ApiExcludeEndpoint()
  async getEvaluationRequestInterests(
    @Response() res: ExpressResponse,
  ): Promise<ExpressResponse> {
    const csv =
      await this.evaluationRequestsInterestsService.getEvaluationRequestInterestsInCsv();
    res.header('Content-Type', 'text/csv');
    res.attachment('EvaluationRequestInterests.csv');
    return res.send(csv);
  }
}
