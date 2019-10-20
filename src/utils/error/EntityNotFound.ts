import { GlobalError, IError } from './GlobalError';

export class EntityNotFoundError extends GlobalError {
  constructor(error: IError) {
    super(error);
  }
}
