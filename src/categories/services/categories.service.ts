import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ILike } from 'typeorm';

import { PaginatedSearchDto } from 'common/dto/paginated-search.dto';
import { CategoryEntity } from 'db/entities/category.entity';
import { EnumItemResponse } from 'common/responses/enum-item.response';
import { CategoryAdditionDto } from 'categories/dto/add-new-category.dto';
import { SpecificCategoriesResponse } from 'categories/responses/specific-categories-response';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CategoryRepository } from 'categories/repositories/category.repository';
import { SpecificCategoryRepository } from 'categories/repositories/specific-category.repository';

const OTHER_CATEGORY_ID = 12;

@Injectable()
export class CategoriesService {
  constructor(
    private categoriesRepo: CategoryRepository,
    private specificCategoriesRepo: SpecificCategoryRepository,
  ) {}

  async getCategories({
    search,
    ...rest
  }: PaginatedSearchDto): Promise<Pagination<EnumItemResponse>> {
    return paginate<CategoryEntity>(this.categoriesRepo, rest, {
      where: { name: ILike(`%${search}%`) },
    });
  }

  async getSpecificCategories({
    search,
    page,
    limit,
  }: PaginatedSearchDto): Promise<Pagination<SpecificCategoriesResponse>> {
    const [items, count] = await this.specificCategoriesRepo
      .createQueryBuilder('specific-category')
      .where({
        userDefinedCategory: ILike(`%${search}%`),
        category: { id: OTHER_CATEGORY_ID },
      })
      .take(limit)
      .skip((page - 1) * limit)
      .select(['specific-category.userDefinedCategory'])
      .distinct(true)
      .getManyAndCount();

    return {
      items,
      meta: {
        itemCount: items.length,
        currentPage: page,
        itemsPerPage: limit,
        totalItems: count,
        totalPages: (count / limit) ^ 0,
      },
    };
  }

  @Transactional()
  async addToCategories(addCategoryDto: CategoryAdditionDto) {
    const newCategory = await this.categoriesRepo.create({
      name: addCategoryDto.userDefinedCategory,
    });

    await this.categoriesRepo.save(newCategory);

    const newCategoryId = await this.categoriesRepo.findOneOrFail({
      where: { name: addCategoryDto.userDefinedCategory },
    });
    const specificCategories = await this.specificCategoriesRepo.find({
      where: {
        userDefinedCategory: addCategoryDto.userDefinedCategory,
        category: { id: OTHER_CATEGORY_ID },
      },
      relations: ['category'],
    });

    specificCategories.map((category) => {
      category.category.id = newCategoryId.id;
      category.userDefinedCategory = null;
    });

    await this.specificCategoriesRepo.save(specificCategories);
  }
}
