export interface IError {
  message: string;
  code: number;
}

export class GlobalError extends Error {
  public code: number;
  constructor(public error: IError) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = error.message;
    this.code = error.code;
  }
}
