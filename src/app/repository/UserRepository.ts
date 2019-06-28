import mongoose = require('mongoose');
import { IUserModel } from '../models/interfaces';
import UserSchema from '../data/schema/User';
import RepositoryBase from './base/RepositoryBase';

class UserRepository extends RepositoryBase<IUserModel> {
  private _userModel: mongoose.Model<mongoose.Document>;
  constructor() {
    super(UserSchema);
    this._userModel = UserSchema;
  }

  findByEmail(email: string): Promise<IUserModel> {
    const promise = new Promise<IUserModel>((resolve, reject) => {
      this._userModel.findOne(
        { email: email },
        (error: any, result: IUserModel) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
    return promise;
  }
}

Object.seal(UserRepository);
export = UserRepository;
