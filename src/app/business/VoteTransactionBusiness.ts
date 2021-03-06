import {
  IContestContestant,
  ContestVoteResult,
} from "./../models/interfaces/custom/ContestList";
import VoteTransactionRepository from "../repository/VoteTransactionRepository";
import IVoteTransactionBusiness = require("./interfaces/VoteTransactionBusiness");
import {
  VoteTransaction,
  VoteStatus,
  IContest,
  IContestEntry,
  IVoteResult,
} from "../models/interfaces";
import { Result } from "../../utils/Result";
import ContestRepository from "../repository/ContestRepository";
import ContestEntryRepository from "../repository/ContestEntryRepository";
import { isAfter, isBefore } from "date-fns";
import PusherHelper = require("../../utils/wrappers/Pusher");
import {
  AppConfig,
  VoteEvent,
} from "../../app/models/interfaces/custom/AppConfig";
const config: AppConfig = module.require("../../config/keys");
import { distanceInWordsStrict } from "date-fns";

class VoteTransactionBusiness implements IVoteTransactionBusiness {
  private _voteTransactionRepository: VoteTransactionRepository;
  private _contestRepository: ContestRepository;
  private _contestEntryRepository: ContestEntryRepository;
  private publisher = PusherHelper.init();

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
    if (item.keyword !== config.CONTEST_KEYWORD) {
      item.voteStatus = VoteStatus.invalid;
      item.reason = "Invalid Keyword";
      const newVote = await this._voteTransactionRepository.create(item);
      return Result.ok<VoteTransaction>(201, newVote);
    }
    var contestEntry = await this._contestEntryRepository.findByCriteria({
      contestantCode: item.contestantCode.toUpperCase(),
    });
    if (!contestEntry) {
      item.voteStatus = VoteStatus.invalid;
      item.reason = "Invalid contestant entry";
      const newVote = await this._voteTransactionRepository.create(item);
      return Result.ok<VoteTransaction>(201, newVote);
    }
    item.contestId = contestEntry.contest;

    const contest = await this._contestRepository.findById(item.contestId);
    if (!contest) {
      item.voteStatus = VoteStatus.invalid;
      item.reason = "Invalid competition";
      const newVote = await this._voteTransactionRepository.create(item);
      return Result.ok<VoteTransaction>(201, newVote);
    }

    if (contest) {
      if (isBefore(Date.now(), contest.startDate)) {
        item.voteStatus = VoteStatus.invalid;
        item.reason = "Competition has not started";
        const newVote = await this._voteTransactionRepository.create(item);
        this.FetchContestResult(contest);
        return Result.ok<VoteTransaction>(201, newVote);
      }
      if (isAfter(Date.now(), contest.endDate)) {
        item.voteStatus = VoteStatus.invalid;
        item.reason = "Competition has ended";
        const newVote = await this._voteTransactionRepository.create(item);
        this.FetchContestResult(contest);
        return Result.ok<VoteTransaction>(201, newVote);
      }
    }

    item.voteStatus = VoteStatus.valid;
    const newVote = await this._voteTransactionRepository.create(item);
    this.FetchContestResult(contest);

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

  async fetchTopContestants(
    contest: string,
    entries: IContestEntry[],
    select: number
  ): Promise<IContestContestant[]> {
    var contestants: IContestContestant[] = [];
    for (let item of entries) {
      var entryVoteCount: IContestEntry[] = await this._voteTransactionRepository.fetch(
        {
          contestId: contest,
          contestantCode: item.contestantCode,
          voteStatus: VoteStatus.valid,
        }
      );
      const entry: IContestContestant = {
        entryId: item._id,
        contestant: item.user._id,
        contestantName: item.user.fullName || "",
        contestantPhoto: item.user.profileImagePath || "",
        contestantEmail: item.user.email,
        contestantCode: item.contestantCode,
        contestantTotalVote: entryVoteCount.length,
        position: item.position,
        prizeRedeemed: item.prizeRedeemed,
      };
      contestants = [...contestants, entry];
    }
    if (contestants.length > 0) {
      contestants = contestants.sort((a, b) => {
        return b.contestantTotalVote - a.contestantTotalVote;
      });
      contestants = contestants.filter(
        (contestant: IContestContestant, index: number) => {
          return index < select;
        }
      );
      return contestants;
    }
    return contestants;
  }

  async fetchContestResult(
    contestId: string,
    createdBy: string
  ): Promise<Result<IVoteResult[]>> {
    let finalResult: IVoteResult[] = [];
    const contest = await this._contestRepository.findById(contestId);
    if (!contest)
      return Result.fail<IVoteResult[]>(404, "Competition not found");
    if (createdBy != contest.createdBy)
      return Result.fail<IVoteResult[]>(
        403,
        "You are not authorized to make reqest"
      );
    const voteResults: VoteTransaction[] = await this._voteTransactionRepository.fetch(
      { contestId: contest._id }
    );

    let i = 1;
    for (let item of voteResults) {
      const result: IVoteResult = {
        sn: i++,
        id: item._id,
        competition_code: contest.code,
        phone: item.phone,
        network: item.network,
        shortcode: item.shortcode,
        contestant_code: item.contestantCode,
        channel_type: item.channelType,
        status: item.voteStatus.toString(),
        vote_date: item.createdAt,
        status_reason: item.reason || ""
      };
      finalResult = [...finalResult, result];
    }
    return Result.ok<IVoteResult[]>(200, finalResult);
  }

  async FetchContestResult(contest: IContest): Promise<ContestVoteResult> {
    var result: ContestVoteResult = {
      contestId: contest._id,
      contestPhoto: contest.bannerImage || "",
      contestTitle: contest.title,
      contestHasEnded: isAfter(Date.now(), contest.endDate),
      contestStartDate: contest.startDate,
      contestDuration: distanceInWordsStrict(
        contest.endDate,
        contest.startDate
      ),
      contestTotalVote: 0,
      contestTotalValidVote: 0,
      contestTotalInvalidVote: 0,
      entries: [],
    };
    var contestTotalVote: VoteTransaction[] = await this._voteTransactionRepository.fetch(
      {
        contestId: contest._id,
      }
    );

    var contestTotalValidVote: VoteTransaction[] = contestTotalVote.filter(
      (x) => x.voteStatus === VoteStatus.valid
    );

    var contestTotalInvalidVote: VoteTransaction[] = contestTotalVote.filter(
      (x) => x.voteStatus === VoteStatus.invalid
    );
    result.contestTotalVote = contestTotalVote.length || 0;
    result.contestTotalValidVote = contestTotalValidVote.length;
    result.contestTotalInvalidVote = contestTotalInvalidVote.length;

    const contestEntries: IContestEntry[] = await this._contestEntryRepository.fetchWithUserDetails(
      {
        contest: contest._id,
        approved: true,
      }
    );

    for (let item of contestEntries) {
      var entryVoteCount: IContestEntry[] = await this._voteTransactionRepository.fetch(
        {
          contestId: contest._id,
          contestantCode: item.contestantCode,
          voteStatus: VoteStatus.valid,
        }
      );
      const entry: IContestContestant = {
        entryId: item._id,
        contestant: item.user._id,
        contestantName: item.user.fullName,
        contestantPhoto: item.user.profileImagePath || "",
        contestantCode: item.contestantCode,
        contestantTotalVote: entryVoteCount.length,
        position: item.position,
        prizeRedeemed: item.prizeRedeemed,
      };
      result.entries = [...result.entries, entry];
    }

    this.publishData(result);
    return result;
  }

  private publishData(data: any) {
    const stringified = JSON.stringify(data);
    this.publisher.publish(
      config.PUSHER.channel,
      VoteEvent.VOTE_RESULT,
      stringified
    );
  }
}

Object.seal(VoteTransactionBusiness);
export = VoteTransactionBusiness;
