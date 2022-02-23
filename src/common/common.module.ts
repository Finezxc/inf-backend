import { Module } from '@nestjs/common';
import { CryptoUtilsService } from 'common/services/crypto-utils.service';
import { UtilsService } from 'common/services/utils.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CryptoUtilsService, UtilsService],
  exports: [CryptoUtilsService, UtilsService],
})
export class CommonModule {}
