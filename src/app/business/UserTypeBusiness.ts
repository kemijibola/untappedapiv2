import UserTypeRepository from '../repository/UserTypeRepository';
import IUserTypeBusiness = require('./interfaces/UserTypeBusiness');
import { IUserType } from '../models/interfaces';
import { Result } from '../../utils/Result';

class UserTypeBusiness implements IUserTypeBusiness {
  private _userTypeRepository: UserTypeRepository;

  constructor() {
    this._userTypeRepository = new UserTypeRepository();
  }

  async fetch(): Promise<Result<IUserType>> {
    try {
      const userTypes = await this._userTypeRepository.fetch();
      return Result.ok<IUserType>(200, userTypes);
    } catch (err) {
      return Result.fail<IUserType>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<IUserType>> {
    try {
      const userType = await this._userTypeRepository.findById(id);
      if (!userType._id)
        return Result.fail<IUserType>(404, `User type of Id ${id} not found`);
      else return Result.ok<IUserType>(200, userType);
    } catch (err) {
      return Result.fail<IUserType>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IUserType>> {
    try {
      const userType = await this._userTypeRepository.findByCriteria(criteria);
      if (!userType._id)
        return Result.fail<IUserType>(404, `User type not found`);
      else return Result.ok<IUserType>(200, userType);
    } catch (err) {
      return Result.fail<IUserType>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(item: IUserType): Promise<Result<IUserType>> {
    try {
      const newUserType = await this._userTypeRepository.create(item);
      return Result.ok<IUserType>(201, newUserType);
    } catch (err) {
      return Result.fail<IUserType>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(id: string, item: IUserType): Promise<Result<IUserType>> {
    try {
      const userType = await this._userTypeRepository.findById(id);
      if (!userType._id)
        return Result.fail<IUserType>(
          404,
          `Could not update user type.User type of Id ${id} not found`
        );
      const updateObj = await this._userTypeRepository.update(
        userType._id,
        item
      );
      return Result.ok<IUserType>(200, updateObj);
    } catch (err) {
      return Result.fail<IUserType>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._userTypeRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(UserTypeBusiness);
export = UserTypeBusiness;
