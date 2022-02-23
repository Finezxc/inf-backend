import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No data submitted');
    }

    const { metatype } = metadata;
    if (!metatype || !this.needsValidation(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: this.buildErrors(errors),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return object;
  }

  // TODO: humanize messages
  private buildErrors(errors: ValidationError[], prefix = '') {
    let result = {};

    for (const err of errors) {
      if (err.children.length > 0) {
        const nestedErrors = this.buildErrors(
          err.children,
          `${prefix}${err.property}.`,
        );

        result = { ...result, ...nestedErrors };
        continue;
      }

      Object.entries(err.constraints).forEach((constraint) => {
        result[`${prefix}${err.property}`] = `${constraint[1]}`;
      });
    }

    return result;
  }

  private needsValidation(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
