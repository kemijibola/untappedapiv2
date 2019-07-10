import UserTypeRepository from '../repository/UserTypeRepository';
import IUserTypeBusiness = require('./interfaces/UserTypeBusiness');
import { IUserType } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class UserTypeBusiness implements IUserTypeBusiness {
  private _userTypeRepository: UserTypeRepository;

  constructor() {
    this._userTypeRepository = new UserTypeRepository();
  }

  fetch(): Promise<IUserType> {
    return this._userTypeRepository.fetch();
  }

  findById(id: string): Promise<IUserType> {
    return this._userTypeRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IUserType> {
    return this.findByCriteria(criteria);
  }

  create(item: IUserType): Promise<IUserType> {
    return this._userTypeRepository.create(item);
  }

  async update(id: string, item: IUserType): Promise<IUserType> {
    const userTypeModel = await this._userTypeRepository.findById(id);
    if (!userTypeModel)
      throw new RecordNotFound(`User Type with id: ${id} not found`, 404);
    return this._userTypeRepository.update(userTypeModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._userTypeRepository.delete(id);
  }
}

Object.seal(UserTypeBusiness);
export = UserTypeBusiness;
