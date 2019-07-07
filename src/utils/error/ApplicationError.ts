import { IError, GlobalError } from './GlobalError';

export class RecordNotFound extends GlobalError {
  constructor(public message: string, public code: number) {
    super({ message: message, code: code });
  }
}

export class InvalidContent extends GlobalError {
  constructor(public message: string, public code: number) {
    super({ message: message, code: code });
  }
}

export class InvalidCredentials extends GlobalError {
  constructor(message: string, code: number) {
    super({ message: message, code: code });
  }
}

export class RecordExists extends GlobalError {
  constructor(message: string, code: number) {
    super({ message: message, code: code });
  }
}

export class FetchRecordFailed extends GlobalError {
  constructor(message: string, code: number) {
    super({ message: message, code: code });
  }
}

export class FetchRecordsFailed extends GlobalError {
  constructor(message: string, code: number) {
    super({ message: message, code: code });
  }
}

export class InternalServerError extends GlobalError {
  constructor(message: string, code: number) {
    super({ message: message, code: code });
  }
}
