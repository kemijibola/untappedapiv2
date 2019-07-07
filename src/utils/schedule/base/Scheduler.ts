export interface IScheduler {
  create<T>(name: string, params: T): void;
  process<T>(name: string, params: T): any;
  delete<T>(params: T): void;
}
