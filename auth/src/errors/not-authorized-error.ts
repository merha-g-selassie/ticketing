import { ErrorMessage } from '../types/ErrorMessage';
import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeError(): ErrorMessage[] {
    return [{ message: 'Not authorized' }];
  }
}
