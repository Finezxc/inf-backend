import { Transform, TransformFnParams } from 'class-transformer';

import { toNumber } from 'common/decorators/to-number.decorator';

export function toArrayNumber(v: any[]): number[] {
  return Array.isArray(v) ? v.map((v) => toNumber(v)) : null;
}

export function ToArrayNumber(): (target: any, key: string) => void {
  return Transform((params: TransformFnParams) => toArrayNumber(params.value));
}
