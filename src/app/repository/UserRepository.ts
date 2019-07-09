import mongoose = require('mongoose');
import { IUserModel } from '../models/interfaces';
import { UserSchema } from '../data/schema/User';
import RepositoryBase from './base/RepositoryBase';

class UserRepository extends RepositoryBase<IUserModel> {
  private userModel: mongoose.Model<mongoose.Document>;
  constructor() {
    super(UserSchema);
    this.userModel = UserSchema;
  }

  userTypeByUser(user: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.userModel
        .findById(user)
        .populate('userType', 'name', (error: any, result: string) => {
          if (error) reject(error);
          else resolve(result);
        });
    });
  }
}

Object.seal(UserRepository);
export = UserRepository;
