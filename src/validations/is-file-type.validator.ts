// is-file-type.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsFileTypeConstraint implements ValidatorConstraintInterface {
  private allowedMimeTypes: string[];

  constructor(allowedMimeTypes: string[]) {
    this.allowedMimeTypes = allowedMimeTypes;
  }

  validate(file: Express.Multer.File) {
    console.log('file', file);
    if (!file || !file.mimetype) {
      return false;
    }
    console.log('file.mimetype', file.mimetype);
    return this.allowedMimeTypes.includes(file.mimetype);
  }

  defaultMessage() {
    return 'File avatar must be a valid image type';
  }
}

export function IsFileType(
  allowedMimeTypes: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [allowedMimeTypes],
      validator: IsFileTypeConstraint,
    });
  };
}
