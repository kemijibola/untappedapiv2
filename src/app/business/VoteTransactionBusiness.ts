import VoteTransactionRepository from "../repository/VoteTransactionRepository";
import IVoteTransactionBusiness = require("./interfaces/VoteTransactionBusiness");
import { VoteTransaction } from "../models/interfaces";
import { Result } from "../../utils/Result";

class VoteTransactionBusiness implements IVoteTransactionBusiness {
  private _voteTransactionRepository: VoteTransactionRepository;

  constructor() {
    this._voteTransactionRepository = new VoteTransactionRepository();
  }

  async fetch(condition: any): Promise<Result<VoteTransaction[]>> {
    const voteTransactions = await this._voteTransactionRepository.fetch(
      condition
    );
    return Result.ok<VoteTransaction[]>(200, voteTransactions);
  }

  async findById(id: string): Promise<Result<VoteTransaction>> {
    if (!id) return Result.fail<VoteTransaction>(400, "Bad request");
    const voteTransaction = await this._voteTransactionRepository.findById(id);
    if (!voteTransaction)
      return Result.fail<VoteTransaction>(404, `Vote not found`);
    return Result.ok<VoteTransaction>(200, voteTransaction);
  }

  async findOne(condition: any): Promise<Result<VoteTransaction>> {
    if (!condition) return Result.fail<VoteTransaction>(400, "Bad request");
    const voteTransaction = await this._voteTransactionRepository.findByOne(
      condition
    );
    if (!voteTransaction)
      return Result.fail<VoteTransaction>(404, `Vote not found`);
    return Result.ok<VoteTransaction>(200, voteTransaction);
  }

  async findByCriteria(criteria: any): Promise<Result<VoteTransaction>> {
    const voteTransaction = await this._voteTransactionRepository.findByCriteria(
      criteria
    );
    if (!voteTransaction)
      return Result.fail<VoteTransaction>(404, `Vote not found`);
    return Result.ok<VoteTransaction>(200, voteTransaction);
  }

  async create(item: VoteTransaction): Promise<Result<VoteTransaction>> {
    const newVote = await this._voteTransactionRepository.create(item);
    return Result.ok<VoteTransaction>(201, newVote);
  }

  async update(
    id: string,
    item: VoteTransaction
  ): Promise<Result<VoteTransaction>> {
    const vote = await this._voteTransactionRepository.findById(id);
    if (!vote) return Result.fail<VoteTransaction>(404, "Vote not found");
    const updateObj = await this._voteTransactionRepository.update(
      vote._id,
      item
    );
    return Result.ok<VoteTransaction>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._voteTransactionRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(VoteTransactionBusiness);
export = VoteTransactionBusiness;
