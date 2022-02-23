import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';

export function DecisionType(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: DecisionTypeConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'DecisionType' })
export class DecisionTypeConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    if (value) {
      if (!args.object['reward'] || !args.object['timeLimit']) {
        throw new HttpException(
          'The reward or timeLimit field must be filled',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return true;
  }
}
