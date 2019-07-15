import { Result } from '../../../../utils/Result';

interface Read<T> {
  fetch: (condition: any) => Promise<Result<T[]>>;
  findById: (id: string) => Promise<Result<T>>;
  findByCriteria: (criteria: any) => Promise<Result<T>>;
}

export = Read;
