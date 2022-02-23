import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { profanity } from '@2toad/profanity';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ILike } from 'typeorm';

import { ExpertiseKeywordEntity } from 'db/entities/expertise-keyword.entity';
import { CreateExpertiseKeywordsDto } from 'expertise-keywords/dto/create-expertise-keywords.dto';
import { PaginatedSearchDto } from 'common/dto/paginated-search.dto';

@Injectable()
export class ExpertiseKeywordsService {
  constructor(
    @InjectRepository(ExpertiseKeywordEntity)
    private expertiseKeywordsRepo: Repository<ExpertiseKeywordEntity>,
  ) {}

  async createExpertiseKeywords(
    createExpertiseKeywordsDto: CreateExpertiseKeywordsDto,
  ) {
    if (
      createExpertiseKeywordsDto.keywords.some((word) => profanity.exists(word))
    ) {
      throw new BadRequestException(
        `Your expertise keywords contain profane words. We don't do this here.`,
      );
    }

    const expertiseKeywords = this.expertiseKeywordsRepo.create(
      createExpertiseKeywordsDto.keywords.map((keyword) => ({ name: keyword })),
    );

    return await this.expertiseKeywordsRepo.save(expertiseKeywords);
  }

  async getExpertiseKeywords({
    search,
    ...rest
  }: PaginatedSearchDto): Promise<Pagination<ExpertiseKeywordEntity>> {
    return paginate<ExpertiseKeywordEntity>(this.expertiseKeywordsRepo, rest, {
      where: { name: ILike(`%${search}%`) },
    });
  }
}
