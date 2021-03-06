import { CompetitionParticipant } from "./../models/interfaces/custom/ContestList";
import {
  IEntries,
  ContestWithEntriesPreview,
  IContestPreview,
  PrizePosition,
} from "./../models/interfaces/Contest";
import ContestRepository from "../repository/ContestRepository";
import ContestEntryRepository from "../repository/ContestEntryRepository";
import CommentRepository from "../repository/CommentRepository";
import VoteTransactionRepository from "../repository/VoteTransactionRepository";
import WalletDataRepository from "../repository/WalletDataRepository";
import IContestBusiness = require("./interfaces/ContestBusiness");
import {
  IContest,
  PaymentStatus,
  MediaType,
  IContestEntry,
  ContestWithEntries,
  IComment,
  VoteTransaction,
  VoteStatus,
  EntryPosition,
} from "../models/interfaces";
import { Result } from "../../utils/Result";
import { ContestType } from "../data/schema/Contest";
import { isAfter, addDays, differenceInDays } from "date-fns";
import {
  IContestList,
  IUserContestListAnalysis,
  IContestEntryPreview,
  AllContestViewModel,
} from "../models/interfaces/custom/ContestList";
import { ContestSummary } from "../../utils/contests/ContestSummary";
import { ContestListAnalysis } from "../../utils/contests/analyzers/ContestListAnalysis";
import {
  getRandomId,
  getTime,
  ObjectKeyString,
  generateCustomChar,
  generateRandomNumber,
} from "../../utils/lib";

class ContestBusiness implements IContestBusiness {
  private _contestRepository: ContestRepository;
  private _contestEntryRepository: ContestEntryRepository;
  private _commentRepository: CommentRepository;
  private _voteTransactionRepository: VoteTransactionRepository;
  private _walletDataRepository: WalletDataRepository;

  constructor() {
    this._contestRepository = new ContestRepository();
    this._contestEntryRepository = new ContestEntryRepository();
    this._commentRepository = new CommentRepository();
    this._voteTransactionRepository = new VoteTransactionRepository();
    this._walletDataRepository = new WalletDataRepository();
  }

  async fetch(condition: any): Promise<Result<IContest[]>> {
    const contests = await this._contestRepository.fetch(condition);
    return Result.ok<IContest[]>(200, contests);
  }

  async paginatedFetch(condition: any): Promise<Result<AllContestViewModel[]>> {
    const contests = await this._contestRepository.fetchOrderByCreatedDate(
      condition
    );
    const modified = await this.aggregateUserContest(contests);
    return Result.ok<AllContestViewModel[]>(200, modified);
  }

  async fetchContestParticipants(
    contestId: string,
    createdBy: string
  ): Promise<Result<CompetitionParticipant[]>> {
    let finalResult: CompetitionParticipant[] = [];
    const contest = await this._contestRepository.findById(contestId);
    if (!contest)
      return Result.fail<CompetitionParticipant[]>(
        404,
        "Competition not found"
      );
    if (createdBy != contest.createdBy)
      return Result.fail<CompetitionParticipant[]>(
        403,
        "You are not authorized to make reqest"
      );
    const competitionParticipants: IContestEntry[] = await this._contestEntryRepository.fetch(
      { contest: contest._id, approved: true }
    );

    let i = 1;
    for (let item of competitionParticipants) {
      const participant: CompetitionParticipant = {
        sn: i++,
        id: item._id,
        competition_code: contest.code,
        contestant_code: item.contestantCode,
        entry: item.entry,
        entry_date: item.createdAt,
      };

      finalResult = [...finalResult, participant];
    }
    return Result.ok<CompetitionParticipant[]>(200, finalResult);
  }

  async fetchContestList(
    condition: any,
    perPage: number,
    page: number
  ): Promise<Result<IContestList[]>> {
    const contests = await this._contestRepository.fetchContests(
      condition,
      page,
      perPage
    );
    const modified = await this.fetchRunningContest(contests);
    return Result.ok<IContestList[]>(200, modified);
  }

  async findById(id: string): Promise<Result<IContest>> {
    if (!id) return Result.fail<IContest>(400, "Bad request.");
    const contest = await this._contestRepository.findById(id);
    if (!contest) return Result.fail<IContest>(404, "Competition not found");
    if (!contest.approved)
      return Result.fail<IContest>(404, "Competition not found");
    return Result.ok<IContest>(200, contest);
  }

  async fetchDashboardContest(): Promise<Result<ContestWithEntriesPreview[]>> {
    let result: ContestWithEntriesPreview[] = [];

    // get latest contests
    // iterate each and get entries
    const latestContests: IContest[] = await this._contestRepository.fetchWithLimit(
      {
        endDate: { $gte: new Date() },
      }
    );

    for (let item of latestContests) {
      const entries: IContestEntry[] = await this._contestEntryRepository.fetchWithUser(
        { contest: item._id }
      );
      const contestPreview: IContestPreview = {
        _id: item._id,
        title: item.title,
        banner: item.bannerImage || "",
        entryCount: entries.length,
      };
      var contestEntry: ContestWithEntriesPreview = {
        contest: contestPreview,
        entries,
      };
      result = [...result, contestEntry];
    }

    return Result.ok<ContestWithEntriesPreview[]>(200, result);
  }

  async fetchContestDetailsById(
    id: string
  ): Promise<Result<ContestWithEntries>> {
    const contest = await this._contestRepository.findById(id);
    if (!contest)
      return Result.fail<ContestWithEntries>(404, "Competition not found");
    if (!contest.approved)
      return Result.fail<ContestWithEntries>(404, "Competition not found");
    let entries: IContestEntry[] = await this._contestEntryRepository.fetchWithUser(
      {
        contest: contest._id,
      }
    );

    let contestDetails: ContestWithEntries = {
      contest: contest,
      submissions: [],
    };
    for (let entry of entries) {
      const entryComment: IContestEntry[] = await this._commentRepository.fetch(
        { entity: entry._id }
      );

      var contestantValidVotes: VoteTransaction[] = await this._voteTransactionRepository.fetch(
        {
          contestId: contest._id,
          contestantCode: entry.contestantCode,
          voteStatus: VoteStatus.valid,
        }
      );
      let entryDetails: IEntries = {
        entry,
        commentCount: entryComment.length || 0,
        totalVote: contestantValidVotes.length || 0,
      };
      contestDetails.submissions = [
        ...contestDetails.submissions,
        entryDetails,
      ];
    }

    return Result.ok<ContestWithEntries>(200, contestDetails);
  }

  async aggregateUserContest(
    userContests: IContest[]
  ): Promise<AllContestViewModel[]> {
    let userContestResults: AllContestViewModel[] = [];
    for (let item of userContests) {
      const contestEntries: IContestEntry[] = await this._contestEntryRepository.fetch(
        {
          contest: item._id,
        }
      );

      const totalContestVotes: VoteTransaction[] = await this._voteTransactionRepository.fetch(
        { contestId: item._id }
      );

      let userContest: AllContestViewModel = {
        _id: item._id,
        code: item.code,
        title: item.title,
        totalEntries: contestEntries.length,
        totalVotes: totalContestVotes.length,
        createdDate: item.createdAt,
        paymentStatus: item.paymentStatus,
        contestStartDate: item.startDate,
        contestEndDate: item.endDate,
      };
      userContestResults = [...userContestResults, userContest];
    }
    return userContestResults;
  }

  async fetchContestListByUser(
    userId: string
  ): Promise<Result<IUserContestListAnalysis[]>> {
    let totalCommentCount: number = 0;
    let contestEntryCommentCountMap: any = {};

    let userContestResults: IUserContestListAnalysis[] = [];
    const userContests: IContest[] = await this._contestRepository.fetch({
      paymentStatus: PaymentStatus.Completed,
      approved: true,
      isSmsOnly: false,
    });

    for (let item of userContests) {
      const contestEntries: IContestEntry[] = await this._contestEntryRepository.fetch(
        {
          contest: item._id,
        }
      );

      contestEntryCommentCountMap["totalCommentCount"] = 0;
      for (let entry of contestEntries) {
        const entryComment: IComment[] = await this._commentRepository.fetch({
          entity: entry._id,
        });
        contestEntryCommentCountMap["totalCommentCount"] =
          contestEntryCommentCountMap["totalCommentCount"] +
          entryComment.length;
      }

      let userContestResult: IUserContestListAnalysis = {
        contestId: item._id,
        contestTitle: item.title,
        contestBanner: item.bannerImage || "",
        contestViewCount: item.views || 0,
        contestLikedByCount: item.likedBy.length,
        entryCount: contestEntries.length,
        commentCount: contestEntryCommentCountMap["totalCommentCount"],
      };
      userContestResults = [...userContestResults, userContestResult];
    }
    return Result.ok<IUserContestListAnalysis[]>(200, userContestResults);
  }

  async findOne(condition: any): Promise<Result<IContest>> {
    if (!condition) return Result.fail<IContest>(400, "Bad request.");
    const contest = await this._contestRepository.findByOne(condition);
    if (!contest) return Result.fail<IContest>(404, "Competition not found");
    if (!contest.approved)
      return Result.fail<IContest>(404, "Competition not found");
    return Result.ok<IContest>(200, contest);
  }

  async findByCriteria(criteria: any): Promise<Result<IContest>> {
    const contest = await this._contestRepository.findByCriteria(criteria);
    if (!contest) return Result.fail<IContest>(404, "Competition not found");
    if (!contest.approved)
      return Result.fail<IContest>(404, "Competition not found");
    return Result.ok<IContest>(200, contest);
  }

  async createSMSVoteCompetition(item: IContest): Promise<Result<IContest>> {
    item.views = 0;
    item.isSmsOnly = true;
    item.likedBy = [];
    item.paymentStatus = PaymentStatus.Completed;
    item.issues = [];
    item.approved = true;
    item.approvedBy = "";
    item.isSmsOnly = true;
    item.code = getRandomId();

    const contestTitleChar = item.title.substring(0, 1);

    let codeHasBeenAssigned = true;
    const newContest = await this._contestRepository.create(item);

    if (newContest) {
      for (let i = 0; i < item.numberOfParticipants; i++) {
        let contestantCode = "";
        contestantCode = generateRandomNumber(4);
        while (codeHasBeenAssigned) {
          const contestCode = await this._contestEntryRepository.findByCriteria(
            {
              contest: newContest._id,
              contestantCode,
            }
          );
          if (contestCode) codeHasBeenAssigned = true;
          else codeHasBeenAssigned = false;
        }
        const entry: IContestEntry = Object.assign({
          user: newContest.createdBy,
          contest: newContest._id,
          title: "SMS Voting Competition",
          entry: "SMS Voting Competition",
          prizeRedeemed: true,
          approved: true,
          contestantCode: contestantCode,
          position: EntryPosition.participant,
        });
        const newContestEntry = await this._contestEntryRepository.create(
          entry
        );
        // newContest.contest
        // newContest.contestantCodes = [
        //   ...newContest.contestantCodes,
        //   newContestEntry.contestantCode,
        // ];
      }
    }
    return Result.ok<IContest>(201, newContest);
  }

  async create(item: IContest): Promise<Result<IContest>> {
    const contest = await this._contestRepository.findByCriteria({
      title: item.title,
    });
    if (contest) {
      return Result.fail<IContest>(
        409,
        `Competition with title ${item.title} already exist`
      );
    }

    item.views = 0;
    item.likedBy = [];
    item.paymentStatus = PaymentStatus.UnPaid;
    item.issues = [];
    item.approved = false;
    item.isSmsOnly = false;
    item.approvedBy = "";

    const newContest = await this._contestRepository.create(item);
    return Result.ok<IContest>(201, newContest);
  }

  async update(id: string, item: IContest): Promise<Result<IContest>> {
    const contest = await this._contestRepository.findById(id);
    if (!contest) return Result.fail<IContest>(404, "Competition not found");
    item.paymentStatus = contest.paymentStatus;
    item.views = contest.views;
    item.approved = contest.approved;
    item.approvedBy = contest.approvedBy;
    item.approvedDate = contest.approvedDate;
    const updateObj = await this._contestRepository.update(contest._id, item);
    return Result.ok<IContest>(200, updateObj);
  }

  async patchCount(id: string, item: any): Promise<Result<IContest>> {
    const contest = await this._contestRepository.findById(id);
    if (!contest) return Result.fail<IContest>(404, "Competition not found");
    item.paymentStatus = contest.paymentStatus;
    item.views = item.views;
    item.approved = contest.approved;
    item.approvedBy = contest.approvedBy;
    item.approvedDate = contest.approvedDate;
    const updateObj = await this._contestRepository.update(contest._id, item);
    return Result.ok<IContest>(200, updateObj);
  }

  async patch(id: string, item: any): Promise<Result<IContest>> {
    const contest = await this._contestRepository.findById(id);
    if (!contest) return Result.fail<IContest>(404, "Competition not found");
    item.paymentStatus = contest.paymentStatus;
    item.views = contest.views;
    item.approved = contest.approved;
    item.approvedBy = contest.approvedBy;
    item.approvedDate = contest.approvedDate;
    const updateObj = await this._contestRepository.update(contest._id, item);
    return Result.ok<IContest>(200, updateObj);
  }

  async rejectContest(
    contestId: string,
    rejectedBy: string,
    rejectionReason: string
  ): Promise<Result<boolean>> {
    const contest = await this._contestRepository.findById(contestId);
    if (!contest) return Result.fail<boolean>(404, "Competition not found");
    await this._contestRepository.patch(contest._id, {
      approved: false,
      approvedBy: rejectedBy,
      rejectionReason,
      approvedDate: new Date(),
    });
    return Result.ok<true>(200, true);
  }

  async approveContest(
    contestId: string,
    approvedBy: string
  ): Promise<Result<boolean>> {
    const contest = await this._contestRepository.findById(contestId);
    if (!contest) return Result.fail<boolean>(404, "Competition not found");
    const updateObj = await this._contestRepository.patch(contest._id, {
      approved: true,
      approvedBy,
      approvedDate: new Date(),
    });
    return Result.ok<true>(200, true);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._contestRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }

  private async fetchRunningContest(
    contests: IContest[]
  ): Promise<IContestList[]> {
    /**
     * current contest = startDate  = today and above
     */
    let contestList: IContestList[] = [];
    for (let item of contests) {
      const contestEntries: IContestEntry[] = await this._contestEntryRepository.fetch(
        {
          contest: item._id,
        }
      );
      const contestObj: IContestList = {
        _id: item._id,
        title: item.title,
        entryCount: contestEntries.length || 0,
        viewCount: item.views,
        bannerImage: item.bannerImage || "",
        endDate: item.endDate,
      };
      contestList = [...contestList, contestObj];
    }

    contestList = contestList.sort((a, b) => {
      return getTime(b.endDate) - getTime(a.endDate);
    });

    return contestList;
  }
}

Object.seal(ContestBusiness);
export = ContestBusiness;
