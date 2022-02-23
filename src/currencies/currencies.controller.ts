import { Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

import { CurrenciesService } from 'currencies/services/currencies.service';
import { CurrencyResponse } from 'currencies/responses/currency.response';
import { UserAuth } from 'auth/decorators/user-auth.decorator';
import { WithPaginatedResponse } from 'common/mixins/with-pagination.mixin';
import { PaginatedSearchDto } from 'common/dto/paginated-search.dto';

@ApiTags(`currencies`)
@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) {}

  @UserAuth()
  @Get()
  @ApiOkResponse({ type: WithPaginatedResponse(CurrencyResponse) })
  @ApiBadRequestResponse()
  async getCurrencies(
    @Query() paginatedSearchDto: PaginatedSearchDto,
  ): Promise<Pagination<CurrencyResponse>> {
    return this.currenciesService.getCurrencies(paginatedSearchDto);
  }
}
