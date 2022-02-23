import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export function IsStringWithDefinedLength(
  minLength = 3,
  maxLength = 250,
  nullable = false,
) {
  return applyDecorators(
    ApiProperty({ type: 'string' }),
    IsString(),
    IsNotEmpty(),
    MinLength(minLength),
    MaxLength(maxLength),
    nullable ? IsOptional() : () => null,
  );
}
