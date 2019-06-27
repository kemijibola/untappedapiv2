import UserRepository from '../repository/UserRepository';
import IUserBusiness from './interface/UserBusiness';
import { IUser } from '../models/interfaces';

class UserBusiness implements IUserBusiness {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  create(item: IUser, callback: (error: any, result: any) => void) {
    this._userRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._userRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IUser,
    callback: (error: any, result: any) => void
  ) {
    this._userRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._userRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._userRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IUser) => void) {
    this._userRepository.findById(_id, callback);
  }
}
Object.seal(UserBusiness);
export = UserBusiness;
