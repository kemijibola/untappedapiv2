export interface IStorage {
  fetch<T>(fetchParams: T): Promise<string>;
  put<T>(putParams: T): void;
}
