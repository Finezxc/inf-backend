import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `Password must contain at least one number and have a length of at least 6 symbols!`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            value.length > 5 &&
            /[0-9]/i.test(value)
          );
        },
      },
    });
  };
}
