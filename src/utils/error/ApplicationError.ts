import { GlobalError, IError } from './GlobalError';

export class PlatformError extends GlobalError {
  constructor(public error: IError) {
    super(error);
  }

  public static error(error: IError): PlatformError {
    return new PlatformError(error);
  }
}
