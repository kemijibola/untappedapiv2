import UserTypeRepository from "../repository/UserTypeRepository";
import IUserTypeBusiness = require("./interfaces/UserTypeBusiness");
import { IUserType } from "../models/interfaces";
import { Result } from "../../utils/Result";

class UserTypeBusiness implements IUserTypeBusiness {
  private _userTypeRepository: UserTypeRepository;

  constructor() {
    this._userTypeRepository = new UserTypeRepository();
  }

  async fetch(condition: any): Promise<Result<IUserType[]>> {
    const userTypes = await this._userTypeRepository.fetch(condition);
    return Result.ok<IUserType[]>(200, userTypes);
  }

  async findById(id: string): Promise<Result<IUserType>> {
    if (!id) return Result.fail<IUserType>(400, "Bad request");
    const userType = await this._userTypeRepository.findById(id);
    if (!userType)
      return Result.fail<IUserType>(404, `UserType of Id ${id} not found`);
    return Result.ok<IUserType>(200, userType);
  }

  async findOne(condition: any): Promise<Result<IUserType>> {
    if (!condition) return Result.fail<IUserType>(400, "Bad request");
    const userType = await this._userTypeRepository.findByOne(condition);
    if (!userType) return Result.fail<IUserType>(404, `UserType not found`);
    return Result.ok<IUserType>(200, userType);
  }

  async findByCriteria(criteria: any): Promise<Result<IUserType>> {
    const userType = await this._userTypeRepository.findByCriteria(criteria);
    if (!userType) return Result.fail<IUserType>(404, `UserType not found`);
    return Result.ok<IUserType>(200, userType);
  }

  async create(item: IUserType): Promise<Result<IUserType>> {
    const userType = await this._userTypeRepository.findByCriteria({
      name: item.name,
    });
    if (userType === null) {
      item.isActive = false;
      const newUserType = await this._userTypeRepository.create(item);
      // TODO:: create approval request here
      return Result.ok<IUserType>(201, newUserType);
    }
    return Result.fail<IUserType>(
      400,
      `UserType with name ${userType.name} exists`
    );
  }

  async update(id: string, item: IUserType): Promise<Result<IUserType>> {
    const userType = await this._userTypeRepository.findById(id);
    if (!userType)
      return Result.fail<IUserType>(
        404,
        `Could not update user type.UserType with Id ${id} not found`
      );
    const updateObj = await this._userTypeRepository.update(userType._id, item);
    return Result.ok<IUserType>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._userTypeRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(UserTypeBusiness);
export = UserTypeBusiness;
