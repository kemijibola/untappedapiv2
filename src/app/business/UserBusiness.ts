import UserRepository from '../repository/UserRepository';
import IUserBusiness = require('./interfaces/UserBusiness');
import { IUserModel } from '../models/interfaces';
import { Result } from '../../utils/Result';

class UserBusiness implements IUserBusiness {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  async fetch(): Promise<Result<IUserModel>> {
    try {
      const users = await this._userRepository.fetch();
      return Result.ok<IUserModel>(200, users);
    } catch (err) {
      return Result.fail<IUserModel>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<IUserModel>> {
    try {
      const user = await this._userRepository.findById(id);
      if (!user._id)
        return Result.fail<IUserModel>(404, `User with Id ${id} not found`);
      else return Result.ok<IUserModel>(200, user);
    } catch (err) {
      return Result.fail<IUserModel>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IUserModel>> {
    try {
      const user = await this._userRepository.findByCriteria(criteria);
      if (!user._id) return Result.fail<IUserModel>(404, `User not found`);
      else return Result.ok<IUserModel>(200, user);
    } catch (err) {
      return Result.fail<IUserModel>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(item: IUserModel): Promise<Result<IUserModel>> {
    try {
      const newUser = await this._userRepository.create(item);
      return Result.ok<IUserModel>(201, newUser);
    } catch (err) {
      return Result.fail<IUserModel>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(id: string, item: IUserModel): Promise<Result<IUserModel>> {
    try {
      const user = await this._userRepository.findById(id);
      if (!user._id)
        return Result.fail<IUserModel>(
          404,
          `Could not update user.User of Id ${id} not found`
        );
      const updateObj = await this._userRepository.update(user._id, item);
      return Result.ok<IUserModel>(200, updateObj);
    } catch (err) {
      return Result.fail<IUserModel>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._userRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(UserBusiness);
export = UserBusiness;
