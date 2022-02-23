import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpertiseKeywordsService } from 'expertise-keywords/services/expertise-keywords.service';
import { ExpertiseKeywordsController } from 'expertise-keywords/expertise-keywords.controller';
import { ExpertiseKeywordEntity } from 'db/entities/expertise-keyword.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpertiseKeywordEntity])],
  controllers: [ExpertiseKeywordsController],
  providers: [ExpertiseKeywordsService],
})
export class ExpertiseKeywordsModule {}
