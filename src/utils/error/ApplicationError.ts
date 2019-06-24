import { IError } from './GlobalError';

export class NotFound implements IError {
  message: string;
  code: number;
  constructor(message?: string, code?: number) {
    this.message = message || 'Record not found.';
    this.code = code || 404;
  }
}

export class InvalidContent implements IError {
  message: string;
  code: number;
  constructor(message?: string, code?: number) {
    this.message = message || 'Provide valid json data.';
    this.code = code || 400;
  }
}

export class InvalidCredentials implements IError {
  message: string;
  code: number;
  constructor(message?: string, code?: number) {
    this.message = message || 'Invalid credentials';
    this.code = code || 400;
  }
}

export class RecordExists implements IError {
  message: string;
  code: number;
  constructor(message?: string, code?: number) {
    this.message = message || 'Record exists in database.';
    this.code = code || 400;
  }
}

export class FetchRecordFailed implements IError {
  message: string;
  code: number;
  constructor(message?: string, code?: number) {
    this.message =
      message || 'Unable to fetch record at this time. Please try again later.';
    this.code = code || 400;
  }
}

export class FetchRecordsFailed implements IError {
  message: string;
  code: number;
  constructor(message?: string, code?: number) {
    this.message =
      message ||
      'Unable to fetchs records at this time. Please try again later.';
    this.code = code || 400;
  }
}
