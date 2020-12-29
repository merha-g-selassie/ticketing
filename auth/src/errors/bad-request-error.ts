import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  reason = 'Error connecting to database';
  statusCode = 400;
  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}
