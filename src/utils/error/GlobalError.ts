export interface IError {
  message: string;
  code: number;
}

export class GlobalError extends Error {
  code: number;
  message: string;
  constructor(public error: IError) {
    super(error.message);
    this.message = error.message;
    this.code = error.code;
  }
}
