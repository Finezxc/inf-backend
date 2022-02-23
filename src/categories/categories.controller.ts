import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

import { CategoriesService } from 'categories/services/categories.service';
import { UserAuth } from 'auth/decorators/user-auth.decorator';
import { WithPaginatedResponse } from 'common/mixins/with-pagination.mixin';
import { PaginatedSearchDto } from 'common/dto/paginated-search.dto';
import { EnumItemResponse } from 'common/responses/enum-item.response';
import { UserRoleEnum } from 'common/enums/user-role.enum';
import { SpecificCategoriesResponse } from 'categories/responses/specific-categories-response';
import { CategoryAdditionDto } from 'categories/dto/add-new-category.dto';

@ApiTags(`categories`)
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  @ApiOkResponse({ type: WithPaginatedResponse(EnumItemResponse) })
  @ApiBadRequestResponse()
  async getCategories(
    @Query() paginatedSearchDto: PaginatedSearchDto,
  ): Promise<Pagination<EnumItemResponse>> {
    return this.categoryService.getCategories(paginatedSearchDto);
  }

  @UserAuth(UserRoleEnum.Admin)
  @Get('specific-categories')
  @ApiOkResponse({ type: WithPaginatedResponse(SpecificCategoriesResponse) })
  @ApiBadRequestResponse()
  async getSpecificCategories(@Query() paginatedSearchDto: PaginatedSearchDto) {
    return this.categoryService.getSpecificCategories(paginatedSearchDto);
  }

  @UserAuth(UserRoleEnum.Admin)
  @Post()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async addToCategories(@Body() addCategoryDto: CategoryAdditionDto) {
    return this.categoryService.addToCategories(addCategoryDto);
  }
}
