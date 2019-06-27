import mongoose from 'mongoose';

interface Write<T> {
  create: (item: T, callback: (error: any, result: any) => void) => void;
  update: (
    id: mongoose.Types.ObjectId,
    item: T,
    callback: (error: any, result: any) => void
  ) => void;
  delete: (id: string, callback: (error: any, result: any) => void) => void;
}

export = Write;
