import WalletDataRepository from "../repository/WalletDataRepository";
import UserRepository from "../repository/UserRepository";
import IWalletDataBusiness = require("./interfaces/WalletDataBusiness");
import { WalletData, WalletViewModel } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { generateRandomNumber } from "../../utils/lib/Helper";
import { PaymentProviderStatus } from "../models/interfaces/custom/TransactionDTO";
import { AnyAaaaRecord } from "dns";

class WalletBusiness implements IWalletDataBusiness {
  private _walletDataRepository: WalletDataRepository;
  private _userRepository: UserRepository;

  constructor() {
    this._walletDataRepository = new WalletDataRepository();
    this._userRepository = new UserRepository();
  }

  async fetch(condition: any): Promise<Result<WalletData[]>> {
    const walletData = await this._walletDataRepository.fetch(condition);
    return Result.ok<WalletData[]>(200, walletData);
  }

  async findById(id: string): Promise<Result<WalletData>> {
    if (!id) return Result.fail<WalletData>(400, "Bad request");
    const walletData = await this._walletDataRepository.findById(id);
    if (!walletData)
      return Result.fail<WalletData>(404, "WalletData Id not found");
    return Result.ok<WalletData>(200, walletData);
  }

  async findOne(condition: any): Promise<Result<WalletData>> {
    if (!condition) return Result.fail<WalletData>(400, "Bad request");
    const walletData = await this._walletDataRepository.findByOne(condition);
    if (!walletData)
      return Result.fail<WalletData>(404, "WalletData not found");
    return Result.ok<WalletData>(200, walletData);
  }

  async findByCriteriaFirstOrDefault(criteria: any): Promise<Result<any>> {
    let userWalletData = null;
    const walletData: WalletData = await this._walletDataRepository.fetchFirstOrDefaultWithUser(
      criteria
    );
    if (walletData) {
      userWalletData = {
        _id: walletData._id,
        user: {
          _id: walletData.user._id,
          name: walletData.user.fullName,
        },
        walletNmber: walletData.walletNumber,
        status: walletData.status,
        balance: walletData.balance,
      };
    }

    return Result.ok<any>(200, userWalletData);
  }

  async findByCriteriaDetails(criteria: any): Promise<Result<WalletData>> {
    const walletData = await this._walletDataRepository.fetchWithUserDetails(
      criteria
    );
    if (!walletData)
      return Result.fail<WalletData>(404, "WalletData not found");
    return Result.ok<WalletData>(200, walletData);
  }

  async findByCriteria(criteria: any): Promise<Result<WalletData>> {
    const walletData = await this._walletDataRepository.findByCriteria(
      criteria
    );
    if (!walletData)
      return Result.fail<WalletData>(404, "WalletData not found");
    return Result.ok<WalletData>(200, walletData);
  }

  async create(item: WalletData): Promise<Result<any>> {
    const walletData = await this._walletDataRepository.findByCriteria({
      user: item.user,
    });
    if (walletData)
      return Result.fail<WalletViewModel>(409, "User wallet exist");

    item.walletNumber = generateRandomNumber(9);
    item.status = PaymentProviderStatus.activated;
    item.balance = 0;
    const newWalletData = await this._walletDataRepository.create(item);

    const walletOwner = await this._userRepository.findById(newWalletData.user);
    let walletInfo = {
      _id: newWalletData._id,
      user: {
        _id: newWalletData.user._id,
        name: walletOwner.fullName,
      },
      walletNmber: newWalletData.walletNumber,
      status: newWalletData.status,
      balance: newWalletData.balance,
    };

    return Result.ok<any>(201, walletInfo);
  }

  async update(id: string, item: WalletData): Promise<Result<WalletData>> {
    const transactionRequest = await this._walletDataRepository.findById(id);
    if (!transactionRequest)
      return Result.fail<WalletData>(
        404,
        "Could not update Wallet Data.Wallet Data not found"
      );
    const updateObj = await this._walletDataRepository.update(
      transactionRequest._id,
      item
    );
    return Result.ok<WalletData>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._walletDataRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(WalletBusiness);
export = WalletBusiness;
