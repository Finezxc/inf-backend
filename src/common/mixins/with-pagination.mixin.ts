import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

import { PaginationMetaType } from 'common/responses/pagination.response';

export type ClassType<T = any> = new (...args: any[]) => T;

export function WithPaginatedResponse<T extends ClassType>(ResourceCls: T) {
  class PaginatedResponse implements Pagination<T> {
    @ApiProperty({ isArray: true, type: ResourceCls })
    readonly items: T[];
    @ApiProperty({ type: PaginationMetaType })
    readonly meta: PaginationMetaType;
  }

  return PaginatedResponse;
}
