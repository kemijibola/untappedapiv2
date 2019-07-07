import { IUserModel } from '../models/interfaces';
import { UserSchema } from '../data/schema/User';
import RepositoryBase from './base/RepositoryBase';

class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserSchema);
  }
}

Object.seal(UserRepository);
export = UserRepository;
