import UserAccountRepository from "../repository/UserAccountRepository";
import IUserAccountBusiness = require("./interfaces/UserAccountBusiness");
import { IUserAccount } from "../models/interfaces";
import { Result } from "../../utils/Result";

class UserAccountBusiness implements IUserAccountBusiness {
  private _userAccountRepository: UserAccountRepository;

  constructor() {
    this._userAccountRepository = new UserAccountRepository();
  }

  async fetch(condition: any): Promise<Result<IUserAccount[]>> {
    const userAccounts = await this._userAccountRepository.fetch(condition);
    return Result.ok<IUserAccount[]>(200, userAccounts);
  }

  async findById(id: string): Promise<Result<IUserAccount>> {
    if (!id) return Result.fail<IUserAccount>(400, "Bad request");
    const userAccount = await this._userAccountRepository.findById(id);
    if (!userAccount)
      return Result.fail<IUserAccount>(404, "UserAccount not found");
    return Result.ok<IUserAccount>(200, userAccount);
  }

  async findOne(condition: any): Promise<Result<IUserAccount>> {
    if (!condition) return Result.fail<IUserAccount>(400, "Bad request");
    const userAccount = await this._userAccountRepository.findByOne(condition);
    if (!userAccount)
      return Result.fail<IUserAccount>(404, "UserAccount not found");
    return Result.ok<IUserAccount>(200, userAccount);
  }

  async findByCriteria(criteria: any): Promise<Result<IUserAccount>> {
    const userAccount = await this._userAccountRepository.findByCriteria(
      criteria
    );
    if (!userAccount)
      return Result.fail<IUserAccount>(404, "UserAccount not found");
    return Result.ok<IUserAccount>(200, userAccount);
  }

  async create(item: IUserAccount): Promise<Result<IUserAccount>> {
    const userAccount = await this._userAccountRepository.findByCriteria({
      user: item.user,
    });
    if (userAccount === null) {
      const newUserAccount = await this._userAccountRepository.create(item);
      return Result.ok<IUserAccount>(201, newUserAccount);
    }
    userAccount.gatewayRecipientCode = item.gatewayRecipientCode;
    userAccount.updateAt = new Date();
    const updateObj = await this._userAccountRepository.update(
      userAccount._id,
      userAccount
    );
    return Result.ok<IUserAccount>(200, updateObj);
  }

  async update(id: string, item: IUserAccount): Promise<Result<IUserAccount>> {
    const userAccount = await this._userAccountRepository.findById(id);
    if (!userAccount)
      return Result.fail<IUserAccount>(404, "UserAccount not found");
    const updateObj = await this._userAccountRepository.update(
      userAccount._id,
      item
    );
    return Result.ok<IUserAccount>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._userAccountRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(UserAccountBusiness);
export = UserAccountBusiness;
