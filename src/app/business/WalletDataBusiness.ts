import WalletDataRepository from "../repository/WalletDataRepository";
import IWalletDataBusiness = require("./interfaces/WalletDataBusiness");
import { WalletData } from "../models/interfaces";
import { Result } from "../../utils/Result";

class TransactionRequestBusiness implements IWalletDataBusiness {
  private _walletDataRepository: WalletDataRepository;

  constructor() {
    this._walletDataRepository = new WalletDataRepository();
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

  async findByCriteria(criteria: any): Promise<Result<WalletData>> {
    const walletData = await this._walletDataRepository.findByCriteria(
      criteria
    );
    if (!walletData)
      return Result.fail<WalletData>(404, "WalletData not found");
    return Result.ok<WalletData>(200, walletData);
  }

  async create(item: WalletData): Promise<Result<WalletData>> {
    const newWalletData = await this._walletDataRepository.create(item);
    return Result.ok<WalletData>(201, newWalletData);
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

Object.seal(TransactionRequestBusiness);
export = TransactionRequestBusiness;
