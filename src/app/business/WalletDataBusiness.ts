import { TransctionType } from "./../models/interfaces/custom/TransactionDTO";
import WalletDataRepository from "../repository/WalletDataRepository";
import UserRepository from "../repository/UserRepository";
import UserAccountRepository from "../repository/UserAccountRepository";
import TransactionRequestRepository from "../repository/TransactionRequestRepository";
import IWalletDataBusiness = require("./interfaces/WalletDataBusiness");
import {
  WalletData,
  WalletViewModel,
  TransactionRequest,
} from "../models/interfaces";
import { Result } from "../../utils/Result";
import { generateRandomNumber, decrypt } from "../../utils/lib/Helper";
import { PaymentProviderStatus } from "../models/interfaces/custom/TransactionDTO";
import { AppConfig } from "../models/interfaces/custom/AppConfig";
import { AbstractPayment } from "../../utils/payments/payer";
import { PaymentFactory } from "../../utils/payments/PaymentFactory";
import { parse } from "date-fns";
const config: AppConfig = module.require("../../config/keys");

class WalletBusiness implements IWalletDataBusiness {
  private _walletDataRepository: WalletDataRepository;
  private _userRepository: UserRepository;
  private _userAccountRepository: UserAccountRepository;
  private _transactionRequestRepository: TransactionRequestRepository;

  constructor() {
    this._walletDataRepository = new WalletDataRepository();
    this._userRepository = new UserRepository();
    this._userAccountRepository = new UserAccountRepository();
    this._transactionRequestRepository = new TransactionRequestRepository();
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

  async transferFromWallet(
    processor: string,
    pin: string,
    amount: number,
    user: string,
    narration?: string
  ): Promise<Result<WalletData>> {
    var userWallet = await this._walletDataRepository.findByCriteria({ user });
    if (!userWallet)
      return Result.fail<WalletData>(404, "User wallet not found");
    if (userWallet.status === PaymentProviderStatus.deactivated)
      return Result.fail<WalletData>(400, "User wallet not activated");
    var walletPin = decrypt(config.KEY, userWallet.pin);
    var decrypted = decrypt(config.KEY, pin);
    if (walletPin !== decrypted)
      return Result.fail<WalletData>(400, "Incorrect wallet pin");
    const walletBalance: any = userWallet.balance;
    const walletBalanceInKobo = walletBalance * 100;
    if (walletBalanceInKobo < amount)
      return Result.fail<WalletData>(400, "Insufficient wallet balance");

    const userAccount = await this._userAccountRepository.findByCriteria({
      user: userWallet.user,
    });
    if (!userAccount)
      return Result.fail<WalletData>(
        404,
        "User account not found. Please setup account before proceeding."
      );

    var recipientCode = userAccount.gatewayRecipientCode || "";
    var paymentFactory: AbstractPayment = new PaymentFactory().create(
      processor.toLowerCase()
    );
    try {
      const result = await paymentFactory.transferFund(
        "balance",
        amount,
        recipientCode,
        narration || `Wallet transfer on ${new Date()}`
      );
      if (result.status) {
        const walletBalance: any = userWallet.balance;
        const newWalletBalance = walletBalance - amount / 100;
        userWallet.balance = newWalletBalance;
        await userWallet.save();

        // log transaction
        const transactionObj: TransactionRequest = Object.assign({
          user: userWallet.user,
          amount: result.data.amount / 100,
          paymentReference: generateRandomNumber(12),
          externalReference: result.data.reference,
          narration: result.data.reason,
          paymentChannel: "paystack",
          transactionType: TransctionType.debit,
          transferCode: result.data.transfer_code,
          responseCode: 200,
          responseMessage: result.message,
          currency: result.data.currency,
          transactionDate: parse(result.data.createdAt),
          transactionStatus: result.data.status,
        });
        await this._transactionRequestRepository.create(transactionObj);
        return Result.ok<WalletData>(201, userWallet);
      } else {
        const transactionObj: TransactionRequest = Object.assign({
          user: userWallet.user,
          amount: result.data.amount / 100 || amount,
          externalReference: result.data.reference || "",
          narration: result.data.reason || "",
          paymentChannel: "paystack",
          transactionType: TransctionType.debit,
          transferCode: result.data.transfer_code || "",
          responseCode: 400,
          responseMessage: result.message,
          currency: result.data.currency,
          transactionDate: parse(result.data.createdAt),
          transactionStatus: result.data.status || "",
        });
        await this._transactionRequestRepository.create(transactionObj);
        return Result.fail<WalletData>(400, result.message);
      }
    } catch (err) {
      const transactionObj: TransactionRequest = Object.assign({
        user: userWallet.user,
        amount: err.body.amount,
        externalReference: "",
        narration: err.body.narration || "",
        paymentChannel: "paystack",
        transactionType: TransctionType.debit,
        transferCode: "",
        responseCode: err.statusCode,
        responseMessage: err.error.message,
        currency: "NGN",
        transactionDate: new Date(),
        transactionStatus: "failed",
      });
      await this._transactionRequestRepository.create(transactionObj);
      return Result.fail<WalletData>(
        400,
        "We are unable to process your request at this time."
      );
    }
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
