import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  // errors: ValidationError[];
  // constructor(errors: ValidationError[]) {
  //   super();
  //   this.errors = errors;
  // }
  //
  // using public is the same as what is above
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
