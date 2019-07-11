import mongoose from 'mongoose';
import { Result } from '../../../../utils/Result';

interface Write<T> {
  create: (item: T) => Promise<Result<T>>;
  update: (id: string, item: T) => Promise<Result<T>>;
  delete: (id: string) => Promise<Result<boolean>>;
}

export = Write;
