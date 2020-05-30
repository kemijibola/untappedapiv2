import {
  IEntries,
  ContestWithEntriesPreview,
  IContestPreview,
} from "./../models/interfaces/Contest";
import ContestRepository from "../repository/ContestRepository";
import ContestEntryRepository from "../repository/ContestEntryRepository";
import CommentRepository from "../repository/CommentRepository";
import IContestBusiness = require("./interfaces/ContestBusiness");
import {
  IContest,
  PaymentStatus,
  MediaType,
  IContestEntry,
  ContestWithEntries,
  IComment,
} from "../models/interfaces";
import { Result } from "../../utils/Result";
import { ContestType } from "../data/schema/Contest";
import { isAfter, addDays, differenceInDays } from "date-fns";
import {
  IContestList,
  IUserContestListAnalysis,
  IContestEntryPreview,
} from "../models/interfaces/custom/ContestList";
import { ContestSummary } from "../../utils/contests/ContestSummary";
import { ContestListAnalysis } from "../../utils/contests/analyzers/ContestListAnalysis";
import { getRandomId, getTime, ObjectKeyString } from "../../utils/lib";

class ContestBusiness implements IContestBusiness {
  private _contestRepository: ContestRepository;
  private _contestEntryRepository: ContestEntryRepository;
  private _commentRepository: CommentRepository;

  constructor() {
    this._contestRepository = new ContestRepository();
    this._contestEntryRepository = new ContestEntryRepository();
    this._commentRepository = new CommentRepository();
  }

  async fetch(condition: any): Promise<Result<IContest[]>> {
    const contests = await this._contestRepository.fetch(condition);
    return Result.ok<IContest[]>(200, contests);
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
    if (!contest) return Result.fail<IContest>(404, "Contest not found");
    return Result.ok<IContest>(200, contest);
  }

  async fetchDashboardContest(): Promise<Result<ContestWithEntriesPreview[]>> {
    console.log("called");
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
      return Result.fail<ContestWithEntries>(404, "Contest not found");
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
      let entryDetails: IEntries = {
        entry,
        commentCount: entryComment.length || 0,
      };
      contestDetails.submissions = [
        ...contestDetails.submissions,
        entryDetails,
      ];
    }

    return Result.ok<ContestWithEntries>(200, contestDetails);
  }

  async fetchContestListByUser(
    userId: string
  ): Promise<Result<IUserContestListAnalysis[]>> {
    let totalCommentCount: number = 0;
    let contestEntryCommentCountMap: any = {};

    let userContestResults: IUserContestListAnalysis[] = [];
    const userContests: IContest[] = await this._contestRepository.fetch({
      paymentStatus: PaymentStatus.Completed,
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
    if (!contest) return Result.fail<IContest>(404, `Contest not found`);
    return Result.ok<IContest>(200, contest);
  }

  async findByCriteria(criteria: any): Promise<Result<IContest>> {
    const contest = await this._contestRepository.findByCriteria(criteria);
    if (!contest) return Result.fail<IContest>(404, `Contest not found`);
    return Result.ok<IContest>(200, contest);
  }

  async create(item: IContest): Promise<Result<IContest>> {
    const contest = await this._contestRepository.findByCriteria({
      title: item.title,
    });
    if (contest) {
      return Result.fail<IContest>(
        409,
        `Contest with title ${item.title} already exist`
      );
    }

    item.views = 0;
    item.likedBy = [];
    item.paymentStatus = PaymentStatus.UnPaid;
    item.issues = [];
    item.code = getRandomId();

    const newContest = await this._contestRepository.create(item);
    return Result.ok<IContest>(201, newContest);
  }

  async update(id: string, item: IContest): Promise<Result<IContest>> {
    const contest = await this._contestRepository.findById(id);
    if (!contest) return Result.fail<IContest>(404, "Contest not found");
    item.paymentStatus = contest.paymentStatus;
    const updateObj = await this._contestRepository.update(contest._id, item);
    return Result.ok<IContest>(200, updateObj);
  }

  async patch(id: string, item: any): Promise<Result<IContest>> {
    const contest = await this._contestRepository.findById(id);
    if (!contest) return Result.fail<IContest>(404, "Contest not found");
    item.paymentStatus = contest.paymentStatus;
    const updateObj = await this._contestRepository.update(contest._id, item);
    return Result.ok<IContest>(200, updateObj);
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
      return b.entryCount - a.entryCount;
    });

    return contestList;
  }
}

Object.seal(ContestBusiness);
export = ContestBusiness;
