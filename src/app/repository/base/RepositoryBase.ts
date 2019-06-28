import mongoose = require('mongoose');
import IRead from '../interface/base/Read';
import IWrite from '../interface/base/Write';
import { reject } from 'async';
import { resolve } from 'path';

class RepositoryBase<T extends mongoose.Document>
  implements IRead<T>, IWrite<T> {
  private _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  create(item: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.create(item, (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  fetch(): Promise<any> {
    return new Promise(() => {
      this._model.find({}, (error: any, result: any) => {
        if (error) reject(error, error);
        else resolve(result);
      });
    });
  }

  update(_id: mongoose.Types.ObjectId, item: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.update({ _id: _id }, item, (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  delete(_id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._model.remove({ _id: this.toObjectId(_id) }, err => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  findById(_id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.findById(_id, (error: any, result: T) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }
}

export = RepositoryBase;
