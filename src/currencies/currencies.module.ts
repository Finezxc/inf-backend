import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CurrenciesService } from 'currencies/services/currencies.service';
import { CurrenciesController } from 'currencies/currencies.controller';
import { CurrencyEntity } from 'db/entities/currency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyEntity])],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule {}
