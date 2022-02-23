import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitationTypeEntity } from 'db/entities/citation-type.entity';
import { ArrayResponse } from 'common/responses/array.response';

@Injectable()
export class CitationTypesService {
  constructor(
    @InjectRepository(CitationTypeEntity)
    private citationTypesRepo: Repository<CitationTypeEntity>,
  ) {}

  async getCitationTypes(): Promise<ArrayResponse<CitationTypeEntity>> {
    const items = await this.citationTypesRepo.find({
      relations: ['citationFields'],
    });

    return { items };
  }
}
