import mongoose from 'mongoose';

interface Write<T> {
  create: (item: T) => Promise<T>;
  update: (id: mongoose.Types.ObjectId, item: T) => Promise<T>;
  delete: (id: string) => Promise<boolean>;
}

export = Write;
