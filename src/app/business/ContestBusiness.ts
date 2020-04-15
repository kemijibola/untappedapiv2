import ContestRepository from "../repository/ContestRepository";
import IContestBusiness = require("./interfaces/ContestBusiness");
import { IContest, PaymentStatus, MediaType } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { ContestType } from "../data/schema/Contest";
import { isAfter, addDays, differenceInDays } from "date-fns";
import { IContestList } from "../models/interfaces/custom/ContestList";
import { ContestSummary } from "../../utils/contests/ContestSummary";
import { ContestListAnalysis } from "../../utils/contests/analyzers/ContestListAnalysis";
import { getRandomId } from "../../utils/lib";

class ContestBusiness implements IContestBusiness {
  private _contestRepository: ContestRepository;

  constructor() {
    this._contestRepository = new ContestRepository();
  }

  async fetch(condition: any): Promise<Result<IContest[]>> {
    const contests = await this._contestRepository.fetch(condition);
    return Result.ok<IContest[]>(200, contests);
  }

  async fetchContestList(condition: any): Promise<Result<IContestList[]>> {
    const contest = await this._contestRepository.fetch(condition);
    const contestSummary = new ContestSummary<IContestList[]>(
      new ContestListAnalysis()
    );
    const contestList = await contestSummary.generateContestListReport(contest);
    return Result.ok<IContestList[]>(200, contestList);
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
    if (isAfter(Date.now(), item.startDate)) {
      return Result.fail<IContest>(
        400,
        "Contest start date must be today or a later date"
      );
    }
    if (differenceInDays(item.startDate, item.endDate) > 14) {
      return Result.fail<IContest>(
        400,
        "Contest duration must not exceed 14 days from start date"
      );
    }
    const mediaType = item.entryMediaType.toLowerCase();
    const systemMediaTypes: string[] = Object.values(MediaType);
    if (!systemMediaTypes.includes(mediaType)) {
      return Result.fail<IContest>(400, "Contest entry media type is invalid");
    }

    if (item.redeemable.length < 1) {
      return Result.fail<IContest>(
        400,
        "Please add at least one winner to contest"
      );
    }

    if (item.redeemable.length > 3) {
      return Result.fail<IContest>(
        400,
        "Contest can not have more than 3 winners"
      );
    }

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
}

Object.seal(ContestBusiness);
export = ContestBusiness;
