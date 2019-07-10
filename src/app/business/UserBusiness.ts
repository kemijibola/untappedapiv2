import UserRepository from '../repository/UserRepository';
import IUserBusiness = require('./interfaces/UserBusiness');
import { IUserModel } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class UserBusiness implements IUserBusiness {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  fetch(): Promise<IUserModel> {
    return this._userRepository.fetch();
  }

  findById(id: string): Promise<IUserModel> {
    return this._userRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IUserModel> {
    return this.findByCriteria(criteria);
  }

  create(item: IUserModel): Promise<IUserModel> {
    return this._userRepository.create(item);
  }

  async update(id: string, item: IUserModel): Promise<IUserModel> {
    const userTypeModel = await this._userRepository.findById(id);
    if (!userTypeModel)
      throw new RecordNotFound(`User with id: ${id} not found`, 404);
    return this._userRepository.update(userTypeModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._userRepository.delete(id);
  }
}

Object.seal(UserBusiness);
export = UserBusiness;
