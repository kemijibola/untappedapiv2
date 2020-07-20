import WalletTransactionRepository from "../repository/WalletTransactionRepository";
import WalletDataRepository from "../repository/WalletDataRepository";
import IWalletTransactionBusiness = require("./interfaces/WalletTransactionBusiness");
import { WalletTransaction } from "../models/interfaces";
import { Result } from "../../utils/Result";

class WalletTransactionBusiness implements IWalletTransactionBusiness {
  private _walletTransactionRepository: WalletTransactionRepository;
  private _walletDataRepository: WalletDataRepository;

  constructor() {
    this._walletTransactionRepository = new WalletTransactionRepository();
    this._walletDataRepository = new WalletDataRepository();
  }

  async fetch(condition: any): Promise<Result<WalletTransaction[]>> {
    const walletTransactions = await this._walletTransactionRepository.fetch(
      condition
    );
    return Result.ok<WalletTransaction[]>(200, walletTransactions);
  }

  async findById(id: string): Promise<Result<WalletTransaction>> {
    if (!id) return Result.fail<WalletTransaction>(400, "Bad request");
    const walletTransaction = await this._walletTransactionRepository.findById(
      id
    );
    if (!walletTransaction)
      return Result.fail<WalletTransaction>(
        404,
        "Wallet transaction not found"
      );
    return Result.ok<WalletTransaction>(200, walletTransaction);
  }

  async findOne(condition: any): Promise<Result<WalletTransaction>> {
    if (!condition) return Result.fail<WalletTransaction>(400, "Bad request");
    const walletTransaction = await this._walletTransactionRepository.findByOne(
      condition
    );
    if (!walletTransaction)
      return Result.fail<WalletTransaction>(
        404,
        "Wallet transaction not found"
      );
    return Result.ok<WalletTransaction>(200, walletTransaction);
  }

  async findByCriteria(criteria: any): Promise<Result<WalletTransaction>> {
    const walletTransaction = await this._walletTransactionRepository.findByCriteria(
      criteria
    );
    if (!walletTransaction)
      return Result.fail<WalletTransaction>(
        404,
        "Wallet transaction not found"
      );
    return Result.ok<WalletTransaction>(200, walletTransaction);
  }

  async create(item: WalletTransaction): Promise<Result<WalletTransaction>> {
    const walletData = await this._walletDataRepository.findById(item._id);
    if (!walletData)
      return Result.fail<WalletTransaction>(404, "Wallet not found");
    const newWalletTransaction = await this._walletTransactionRepository.create(
      item
    );
    return Result.ok<WalletTransaction>(201, newWalletTransaction);
  }

  async update(
    id: string,
    item: WalletTransaction
  ): Promise<Result<WalletTransaction>> {
    const userType = await this._walletTransactionRepository.findById(id);
    if (!userType)
      return Result.fail<WalletTransaction>(
        404,
        "Wallet transaction not found"
      );
    const updateObj = await this._walletTransactionRepository.update(
      userType._id,
      item
    );
    return Result.ok<WalletTransaction>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._walletTransactionRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(WalletTransactionBusiness);
export = WalletTransactionBusiness;
