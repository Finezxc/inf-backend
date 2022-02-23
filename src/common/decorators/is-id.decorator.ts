import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

import { ToArrayNumber } from 'common/decorators/to-array-number.decorator';

export const IsId = ({ nullable = false, each = false } = {}) => {
  return applyDecorators(
    nullable ? IsOptional() : () => null,
    IsInt({ each }),
    each
      ? ToArrayNumber()
      : Transform(({ value }) => {
          return Number(value);
        }),
  );
};
