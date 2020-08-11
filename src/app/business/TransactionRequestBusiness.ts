import TransactionRequestRepository from "../repository/TransactionRequestRepository";
import UserAccountRepository from "../repository/UserAccountRepository";
import ITransctionRequestBusiness = require("./interfaces/TransctionRequestBsiness");
import { TransactionRequest } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { parse } from "date-fns";

class TransactionRequestBusiness implements ITransctionRequestBusiness {
  private _transactionRequestRepository: TransactionRequestRepository;
  private _userAccountRepository: UserAccountRepository;

  constructor() {
    this._transactionRequestRepository = new TransactionRequestRepository();
    this._userAccountRepository = new UserAccountRepository();
  }

  async fetch(condition: any): Promise<Result<TransactionRequest[]>> {
    const transationRequests = await this._transactionRequestRepository.fetch(
      condition
    );
    return Result.ok<TransactionRequest[]>(200, transationRequests);
  }

  async fetchTransactions(
    condition: any
  ): Promise<Result<TransactionRequest[]>> {
    const transationRequests = await this._transactionRequestRepository.fetchTransactionsOrderedByDate(
      condition
    );
    return Result.ok<TransactionRequest[]>(200, transationRequests);
  }

  async findById(id: string): Promise<Result<TransactionRequest>> {
    if (!id) return Result.fail<TransactionRequest>(400, "Bad request");
    const transactionRequest = await this._transactionRequestRepository.findById(
      id
    );
    if (!transactionRequest)
      return Result.fail<TransactionRequest>(
        404,
        "TransactionRequest Id not found"
      );
    return Result.ok<TransactionRequest>(200, transactionRequest);
  }

  async findOne(condition: any): Promise<Result<TransactionRequest>> {
    if (!condition) return Result.fail<TransactionRequest>(400, "Bad request");
    const transactionRequest = await this._transactionRequestRepository.findByOne(
      condition
    );
    if (!transactionRequest)
      return Result.fail<TransactionRequest>(
        404,
        "TransactionRequest not found"
      );
    return Result.ok<TransactionRequest>(200, transactionRequest);
  }

  async findByCriteria(criteria: any): Promise<Result<TransactionRequest>> {
    const transactionRequest = await this._transactionRequestRepository.findByCriteria(
      criteria
    );
    if (!transactionRequest)
      return Result.fail<TransactionRequest>(
        404,
        "TransactionRequest not found"
      );
    return Result.ok<TransactionRequest>(200, transactionRequest);
  }

  async create(item: TransactionRequest): Promise<Result<TransactionRequest>> {
    const newTransactionRequest = await this._transactionRequestRepository.create(
      item
    );
    return Result.ok<TransactionRequest>(201, newTransactionRequest);
  }

  async updateTransactionStatus(
    transferCode: string,
    recipientCode: string,
    amount: number,
    status: string,
    responseMessge: string,
    responseCode: number,
    responseBody: string,
    transferredAt: string = ""
  ): Promise<boolean> {
    console.log("got here", recipientCode);
    var recipient = await this._userAccountRepository.findByCriteria({
      gatewayRecipientCode: recipientCode,
    });
    console.log(recipient);
    if (recipient) {
      const transaction = await this._transactionRequestRepository.findByCriteria(
        { transferCode, user: recipient.user }
      );
      console.log("transaction", transaction);
      if (transaction.amount === amount) {
        transaction.transactionStatus = status;
        transaction.transactionDate =
          parse(transferredAt) || transaction.transactionDate;
        transaction.responseMessage = responseMessge;
        transaction.responseBody = responseBody;
        transaction.responseCode = responseCode;
        await this._transactionRequestRepository.update(
          transaction._id,
          transaction
        );
        return true;
      }
    }
    return false;
  }

  async update(
    id: string,
    item: TransactionRequest
  ): Promise<Result<TransactionRequest>> {
    const transactionRequest = await this._transactionRequestRepository.findById(
      id
    );
    if (!transactionRequest)
      return Result.fail<TransactionRequest>(
        404,
        "Could not update TransactionRequest.TransactionRequest not found"
      );
    const updateObj = await this._transactionRequestRepository.update(
      transactionRequest._id,
      item
    );
    return Result.ok<TransactionRequest>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._transactionRequestRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(TransactionRequestBusiness);
export = TransactionRequestBusiness;
