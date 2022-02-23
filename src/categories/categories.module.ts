import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesService } from 'categories/services/categories.service';
import { CategoriesController } from 'categories/categories.controller';
import { CategoryRepository } from 'categories/repositories/category.repository';
import { SpecificCategoryRepository } from 'categories/repositories/specific-category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepository, SpecificCategoryRepository]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
