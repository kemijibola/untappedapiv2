import UserTypeRepository from '../repository/UserTypeRepository';
import IUserTypeBusiness from './interface/UserTypeBusiness';
import { IUserType } from '../models/interfaces';

class UserTypeBusiness implements IUserTypeBusiness {
  private _userTypeRepository: UserTypeRepository;

  constructor() {
    this._userTypeRepository = new UserTypeRepository();
  }

  create(item: IUserType, callback: (error: any, result: any) => void) {
    this._userTypeRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._userTypeRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IUserType,
    callback: (error: any, result: any) => void
  ) {
    this._userTypeRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._userTypeRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._userTypeRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IUserType) => void) {
    this._userTypeRepository.findById(_id, callback);
  }
}
Object.seal(UserTypeBusiness);
export = UserTypeBusiness;
