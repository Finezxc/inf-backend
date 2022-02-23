import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Min, Max } from 'class-validator';

export function IsValidRating(minValue = 1, maxValue = 5, nullable = false) {
  return applyDecorators(
    ApiProperty({ type: 'number' }),
    IsNumber(),
    IsNotEmpty(),
    Min(minValue),
    Max(maxValue),
    nullable ? IsOptional() : () => null,
  );
}
