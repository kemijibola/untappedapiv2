import ContestRepository from "../repository/ContestRepository";
import IContestBusiness = require("./interfaces/ContestBusiness");
import { IContest, PaymentStatus } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { ContestType } from "../data/schema/Contest";
import { isAfter, addDays } from "date-fns";
import { IContestList } from "../models/interfaces/custom/ContestList";
import { ContestSummary } from "../../utils/contests/ContestSummary";
import { ContestListAnalysis } from "../../utils/contests/analyzers/ContestListAnalysis";

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
    // TODO:: end date
    // TODO:: confirm categories sent by client
    if (item.contestType === ContestType.OnlineOffline) {
      if (!item.maxContestant || item.maxContestant < 3) {
        const endDate: Date = addDays(item.startDate, item.duration);
        if (item.grandFinaleDate) {
          const isGrandFinaleDateAfter: boolean = isAfter(
            item.grandFinaleDate,
            endDate
          );
          if (!isGrandFinaleDateAfter)
            return Result.fail<IContest>(
              400,
              "Grand finale date must be after end of contest."
            );
        } else {
          return Result.fail<IContest>(
            400,
            "Please provide Grand finale date."
          );
        }
        if (!item.evaluations) {
          return Result.fail<IContest>(
            400,
            "Please provide criteria for evaluating contestants."
          );
        }
      } else {
        return Result.fail<IContest>(
          400,
          "Maximum number of contestants to be selected must be more than two"
        );
      }
    }
    item.isApproved = false;
    item.paymentStatus = PaymentStatus.UnPaid;
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
