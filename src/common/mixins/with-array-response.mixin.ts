import { ApiProperty } from '@nestjs/swagger';

import { ArrayResponse } from 'common/responses/array.response';

export type ClassType<T = any> = new (...args: any[]) => T;

export function WithArrayResponse<T extends ClassType>(ResourceCls: T) {
  class SimpleArrayResponse implements ArrayResponse<T> {
    @ApiProperty({ isArray: true, type: ResourceCls })
    readonly items: T[];
  }

  return SimpleArrayResponse;
}
