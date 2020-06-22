import { ContestListController } from "./../../controllers/ContestListController";
import VoteTransactionRepository from "../repository/VoteTransactionRepository";
import IVoteTransactionBusiness = require("./interfaces/VoteTransactionBusiness");
import { VoteTransaction, VoteStatus } from "../models/interfaces";
import { Result } from "../../utils/Result";
import ContestRepository from "../repository/ContestRepository";
import ContestEntryRepository from "../repository/ContestEntryRepository";
import { isAfter } from "date-fns";

class VoteTransactionBusiness implements IVoteTransactionBusiness {
  private _voteTransactionRepository: VoteTransactionRepository;
  private _contestRepository: ContestRepository;
  private _contestEntryRepository: ContestEntryRepository;

  constructor() {
    this._voteTransactionRepository = new VoteTransactionRepository();
    this._contestRepository = new ContestRepository();
    this._contestEntryRepository = new ContestEntryRepository();
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

  async fetchContestantVoteCount(
    contest: string,
    contestantCode: string
  ): Promise<Result<number>> {
    var votes: VoteTransaction[] = await this._voteTransactionRepository.fetch({
      contestantCode: contestantCode,
      contestId: contest,
      voteStatus: VoteStatus.valid,
    });
    return Result.ok<number>(200, votes.length);
  }

  async createSMSVote(item: VoteTransaction): Promise<Result<VoteTransaction>> {
    var contestEntry = await this._contestEntryRepository.findByCriteria({
      contestantCode: item.contestantCode,
    });
    if (!contestEntry) {
      item.voteStatus = VoteStatus.invalid;
      const newVote = await this._voteTransactionRepository.create(item);
      return Result.ok<VoteTransaction>(201, newVote);
    }
    item.contestId = contestEntry.contest;

    const contest = await this._contestRepository.findById(item.contestId);
    if (!contest) {
      item.voteStatus = VoteStatus.invalid;
      const newVote = await this._voteTransactionRepository.create(item);
      return Result.ok<VoteTransaction>(201, newVote);
    }

    if (contest) {
      if (isAfter(Date.now(), contest.endDate)) {
        item.voteStatus = VoteStatus.invalid;
        const newVote = await this._voteTransactionRepository.create(item);
        return Result.ok<VoteTransaction>(201, newVote);
      }
    }

    item.voteStatus = VoteStatus.valid;
    const newVote = await this._voteTransactionRepository.create(item);
    return Result.ok<VoteTransaction>(201, newVote);
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
