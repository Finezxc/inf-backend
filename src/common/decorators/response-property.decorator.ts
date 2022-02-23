import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ManagedResponseType } from 'common/types/managed-response.type';
import { ToNestedType } from 'common/decorators/to-nested-type.decorator';

interface ResponsePropertyParams<T> {
  nullable?: boolean;
  each?: boolean;
  cls?: ManagedResponseType<T>;
  enum?: unknown;
}

export function ResponseProperty<T>({
  nullable = false,
  each = false,
  cls = null,
  ...rest
}: ResponsePropertyParams<T> = {}) {
  return applyDecorators(
    cls
      ? ApiProperty({ type: each ? [cls] : cls, required: !nullable })
      : ApiProperty({ isArray: each, nullable, enum: rest.enum }),
    Expose(),
    cls ? ToNestedType(cls) : (a) => a,
    cls ? Type(() => cls) : (a) => a,
  );
}
