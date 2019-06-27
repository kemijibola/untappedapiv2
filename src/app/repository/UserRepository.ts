import { IUser } from '../models/interfaces';
import UserSchema from '../data/schema/User';
import RepositoryBase from './base/RepositoryBase';

class UserRepository extends RepositoryBase<IUser> {
  constructor() {
    super(UserSchema);
  }
}

Object.seal(UserRepository);
export = UserRepository;
