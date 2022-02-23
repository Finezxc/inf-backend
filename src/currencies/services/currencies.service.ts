import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ILike } from 'typeorm';

import { CurrencyEntity } from 'db/entities/currency.entity';
import { PaginatedSearchDto } from 'common/dto/paginated-search.dto';
import { CurrencyResponse } from 'currencies/responses/currency.response';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private currenciesRepo: Repository<CurrencyEntity>,
  ) {}

  async getCurrencies({
    search,
    ...rest
  }: PaginatedSearchDto): Promise<Pagination<CurrencyResponse>> {
    return paginate<CurrencyEntity>(this.currenciesRepo, rest, {
      where: { name: ILike(`%${search}%`) },
    });
  }
}
