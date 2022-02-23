import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

import { CreateExpertiseKeywordsDto } from 'expertise-keywords/dto/create-expertise-keywords.dto';
import { ExpertiseKeywordsService } from 'expertise-keywords/services/expertise-keywords.service';
import { EnumItemResponse } from 'common/responses/enum-item.response';
import { UserAuth } from 'auth/decorators/user-auth.decorator';
import { PaginatedSearchDto } from 'common/dto/paginated-search.dto';
import { WithPaginatedResponse } from 'common/mixins/with-pagination.mixin';

@ApiTags(`expertise-keywords`)
@Controller('expertise-keywords')
export class ExpertiseKeywordsController {
  constructor(private expertiseKeywordsService: ExpertiseKeywordsService) {}

  @Post()
  @ApiBadRequestResponse()
  createExpertiseKeywords(
    @Body() createExpertiseKeywordsDto: CreateExpertiseKeywordsDto,
  ) {
    return this.expertiseKeywordsService.createExpertiseKeywords(
      createExpertiseKeywordsDto,
    );
  }

  @UserAuth()
  @Get()
  @ApiOkResponse({ type: WithPaginatedResponse(EnumItemResponse) })
  @ApiBadRequestResponse()
  async getExpertiseKeywords(
    @Query() paginatedSearchDto: PaginatedSearchDto,
  ): Promise<Pagination<EnumItemResponse>> {
    return this.expertiseKeywordsService.getExpertiseKeywords(
      paginatedSearchDto,
    );
  }
}
