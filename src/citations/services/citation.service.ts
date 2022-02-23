import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Citation } from '../../db/entities/citation.entity';

@Injectable()
export class CitationService {
  constructor(
    @InjectRepository(Citation)
    private readonly citationRepo: Repository<Citation>,
  ) {}

  async createCitations(citations: Citation[]): Promise<Citation[]> {
    await this.citationRepo.save(citations);
    return citations;
  }

  async getAllCitationByResponseId(responseId: number): Promise<Citation[]> {
    const array = [];
    const citations = await this.citationRepo.find({
      where: { responseId },
      relations: ['citationField', 'citationType'],
    });
    citations.map((citation) => {
      const citationType = array.find(
        (item) => item.citationType.id === citation.citationType.id,
      );
      if (!citationType) {
        array.push({
          citationType: citation.citationType,
          fields: [
            Object.assign(citation.citationField, { value: citation.value }),
          ],
        });
      } else {
        citationType.fields.push(
          Object.assign(citation.citationField, { value: citation.value }),
        );
      }
    });
    return array;
  }

  async getAllCitationByIds(ids) {
    return this.citationRepo.find({
      where: {
        citationTypeConnectionId: In(ids),
      },
      relations: ['citationField'],
    });
  }
}
