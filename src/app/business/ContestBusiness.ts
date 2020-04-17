import ContestRepository from "../repository/ContestRepository";
import ContestEntryRepository from "../repository/ContestEntryRepository";
import IContestBusiness = require("./interfaces/ContestBusiness");
import {
  IContest,
  PaymentStatus,
  MediaType,
  IContestEntry,
} from "../models/interfaces";
import { Result } from "../../utils/Result";
import { ContestType } from "../data/schema/Contest";
import { isAfter, addDays, differenceInDays } from "date-fns";
import { IContestList } from "../models/interfaces/custom/ContestList";
import { ContestSummary } from "../../utils/contests/ContestSummary";
import { ContestListAnalysis } from "../../utils/contests/analyzers/ContestListAnalysis";
import { getRandomId, getTime } from "../../utils/lib";

class ContestBusiness implements IContestBusiness {
  private _contestRepository: ContestRepository;
  private _contestEntryRepository: ContestEntryRepository;

  constructor() {
    this._contestRepository = new ContestRepository();
    this._contestEntryRepository = new ContestEntryRepository();
  }

  async fetch(condition: any): Promise<Result<IContest[]>> {
    const contests = await this._contestRepository.fetch(condition);
    return Result.ok<IContest[]>(200, contests);
  }

  async fetchContestList(condition: any): Promise<Result<IContestList[]>> {
    const contests = await this._contestRepository.fetch(condition);
    const modified = await this.fetchRunningContest(contests);
    return Result.ok<IContestList[]>(200, modified);
  }

  async findById(id: string): Promise<Result<IContest>> {
    if (!id) return Result.fail<IContest>(400, "Bad request.");
    const contest = await this._contestRepository.findById(id);
    if (!contest)
      return Result.fail<IContest>(404, `Contest of Id ${id} not found`);
    return Result.ok<IContest>(200, contest);
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
        400,
        `Contest with title ${item.title} already exist`
      );
    }

    item.views = 0;
    item.likes = 0;
    item.paymentStatus = PaymentStatus.UnPaid;
    item.issues = [];
    item.code = getRandomId();

    const newContest = await this._contestRepository.create(item);
    return Result.ok<IContest>(201, newContest);
  }

  async update(id: string, item: IContest): Promise<Result<IContest>> {
    const contest = await this._contestRepository.findById(id);
    if (!contest)
      return Result.fail<IContest>(
        404,
        `Could not update contest.Contest with Id ${id} not found`
      );
    const updateObj = await this._contestRepository.update(contest._id, item);
    return Result.ok<IContest>(200, updateObj);
  }

  async patch(id: string, item: any): Promise<Result<IContest>> {
    const contest = await this._contestRepository.findById(id);
    if (!contest)
      return Result.fail<IContest>(
        404,
        `Could not update contest.Contest with Id ${id} not found`
      );
    const updateObj = await this._contestRepository.update(contest._id, item);
    // console.log(updateObj.);
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
    const currentDate = new Date();
    let currentContests = contests
      .filter((x) => x.startDate >= currentDate)
      .sort((a, b) => {
        return getTime(a.createdAt) - getTime(b.createdAt);
      });

    for (let item of currentContests) {
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
        bannerImage: item.bannerImage,
      };
      contestList = [...contestList, contestObj];
    }
    contestList = contestList.sort((a, b) => {
      return b.entryCount - a.entryCount;
    });
    // mergedContests = [...mergedContests, ...contestList];
    let earlierContests = contests
      .filter((x) => x.startDate < currentDate)
      .sort((a, b) => {
        return getTime(b.startDate) - getTime(a.startDate);
      });

    for (let item of earlierContests) {
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
        bannerImage: item.bannerImage,
      };
      contestList = [...contestList, contestObj];
    }
    return contestList;
  }
}

Object.seal(ContestBusiness);
export = ContestBusiness;
