import { IUserType } from '../models/interfaces';
import { UserTypeSchema } from '../data/schema/UserType';
import RepositoryBase from './base/RepositoryBase';

class UserTypeRepository extends RepositoryBase<IUserType> {
  constructor() {
    super(UserTypeSchema);
  }
}

Object.seal(UserTypeRepository);
export = UserTypeRepository;
