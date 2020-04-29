import { GlobalError, IError } from "./GlobalError";

export class PlatformError extends GlobalError {
  constructor(error: IError) {
    super(error);
  }
}
