export interface IResult<T> {
  isSuccessful: boolean;
  error?: string;
  data?: T;
  responseCode: number;
}

export class Result<T> {
  constructor(
    public responseCode: number,
    public isSuccessful: boolean,
    public data?: T,
    public error?: string
  ) {
    if (isSuccessful && error) {
      throw new Error(`InvalidOperation: A result cannot be 
      successful and contain an error`);
    }
    if (!isSuccessful && !error) {
      throw new Error(`InvalidOperation: A failing result 
      needs to contain an error message`);
    }
    Object.seal(this);
  }
  public static ok<U>(responseCode: number, value?: U): Result<U> {
    return new Result<U>(responseCode, true, value);
  }
  public static fail<U>(responseCode: number, error: string): Result<U> {
    return new Result<U>(responseCode, false, undefined, error);
  }
}
