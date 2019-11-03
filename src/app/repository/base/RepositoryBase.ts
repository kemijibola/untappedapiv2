import mongoose from 'mongoose';
import IRead from '../interface/base/Read';
import IWrite from '../interface/base/Write';

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

  fetch(condition = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .find(condition, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        .cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  update(_id: string, item: T): Promise<T> {
    const options = { new: true, useFindAndModify: false };
    return new Promise((resolve, reject) => {
      this._model.findByIdAndUpdate(
        _id,
        item,
        options,
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
  }

  patch(_id: string, item: any): Promise<T> {
    const options = { new: true, useFindAndModify: false };
    return new Promise((resolve, reject) => {
      this._model.findByIdAndUpdate(
        _id,
        item,
        options,
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
  }
  // updateMany(_ids: string[], item: T): Promise<T> {
  //   return new Promise((resolve, reject) => {
  //     this._model.updateMany({ _id: this.toObjectId(_ids) }, item, (error: any, result: any) => {
  //       if (error) reject(error);
  //       else resolve(result);
  //     });
  //   });
  // }

  delete(_id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._model.remove({ _id: this.toObjectId(_id) }, err => {
        if (err) reject(err);
        else resolve(true);
      });
      // .cache({ collectionName: this._model.collection.name });
    });
  }

  findByOne(condition = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.findOne(condition, (error: any, result: T) => {
        if (error) reject(error);
        else resolve(result);
      });
      // .cacheDocQuery({ collectionName: this._model.collection.name });
    });
  }

  findById(_id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.findById(_id, (error: any, result: T) => {
        if (error) reject(error);
        else resolve(result);
      });
      // .cacheDocQuery({ collectionName: this._model.collection.name });
    });
  }

  findByIdCriteria(criteria = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.findById(criteria, (error: any, result: T) => {
        if (error) reject(error);
        else resolve(result);
      });
      // .cacheDocQuery({ collectionName: this._model.collection.name });
    });
  }

  findByCriteria(criteria = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.findOne(criteria, (error: any, result: T) => {
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
