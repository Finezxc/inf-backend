import { BadRequestException, Injectable } from '@nestjs/common';
import { InterestRepository } from 'interests/repositories/interest.repository';
import { InterestEntity } from 'db/entities/interest.entity';
import { IdType } from 'common/types/id-type.type';
import { AppErrors } from 'common/constansts/app.errors';
import { CategoryEntity } from 'db/entities/category.entity';

@Injectable()
export class InterestService {
  constructor(private readonly interestRepository: InterestRepository) {}

  async create(newInterest: {
    fullName: string;
    email: string;
    location: string;
    expertiseCategoryIds: IdType[];
  }): Promise<InterestEntity> {
    const interest = await this.interestRepository.findOne({
      email: newInterest.email,
    });
    if (interest) {
      throw new BadRequestException(
        AppErrors.THE_USER_HAS_ALREADY_REGISTERED_HIS_INTEREST_IN_BECOMING_AN_INFOMATIX_APPRAISER,
      );
    }
    const createInterest = this.interestRepository.create({
      fullName: newInterest.fullName,
      email: newInterest.email,
      location: newInterest.location,
      expertiseCategories: newInterest.expertiseCategoryIds?.map(
        (id) => ({ id } as CategoryEntity),
      ),
    });
    return this.interestRepository.save(createInterest);
  }
}
