import TransactionRequestRepository from "../repository/TransactionRequestRepository";
import ITransctionRequestBsiness = require("./interfaces/TransctionRequestBsiness");
import { TransactionRequest } from "../models/interfaces";
import { Result } from "../../utils/Result";

class TransactionRequestBusiness implements ITransctionRequestBsiness {
  private _transactionRequestRepository: TransactionRequestRepository;

  constructor() {
    this._transactionRequestRepository = new TransactionRequestRepository();
  }

  async fetch(condition: any): Promise<Result<TransactionRequest[]>> {
    const transationRequests = await this._transactionRequestRepository.fetch(
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
