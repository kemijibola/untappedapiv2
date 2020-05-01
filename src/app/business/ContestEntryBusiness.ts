import ContestEntryRepository from "../repository/ContestEntryRepository";
import ContestRepository from "../repository/ContestRepository";
import UserRepository from "../repository/UserRepository";
import IContestEntryBusiness = require("./interfaces/ContestEntryBusiness");
import { IContestEntry } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { generateRandomNumber } from "../../utils/lib";

class ContestBusiness implements IContestEntryBusiness {
  private _contestEntryRepository: ContestEntryRepository;
  private _contestRepository: ContestRepository;
  private _userRepository: UserRepository;

  constructor() {
    this._contestEntryRepository = new ContestEntryRepository();
    this._contestRepository = new ContestRepository();
    this._userRepository = new UserRepository();
  }

  async fetch(condition: any): Promise<Result<IContestEntry[]>> {
    const contestEntries = await this._contestEntryRepository.fetch(condition);
    return Result.ok<IContestEntry[]>(200, contestEntries);
  }

  async findById(id: string): Promise<Result<IContestEntry>> {
    if (!id) return Result.fail<IContestEntry>(400, "Bad request.");
    const contestEntry = await this._contestEntryRepository.findById(id);
    if (!contestEntry)
      return Result.fail<IContestEntry>(
        404,
        `Contest entry of Id ${id} not found`
      );
    return Result.ok<IContestEntry>(200, contestEntry);
  }

  async findOne(condition: any): Promise<Result<IContestEntry>> {
    if (!condition) return Result.fail<IContestEntry>(400, "Bad request.");
    const contestEntry = await this._contestEntryRepository.findByOne(
      condition
    );
    if (!contestEntry)
      return Result.fail<IContestEntry>(404, `Contest entry not found`);
    return Result.ok<IContestEntry>(200, contestEntry);
  }

  async findByCriteria(criteria: any): Promise<Result<IContestEntry>> {
    const contestEntry = await this._contestEntryRepository.findByCriteria(
      criteria
    );
    if (!contestEntry)
      return Result.fail<IContestEntry>(404, `Contest entry not found`);
    return Result.ok<IContestEntry>(200, contestEntry);
  }

  async create(item: IContestEntry): Promise<Result<IContestEntry>> {
    const contest = await this._contestRepository.findById(item.contest);
    const contestant = await this._userRepository.findById(item.user);
    if (!contestant)
      return Result.fail<IContestEntry>(404, "Contestant not found");
    let codeHasBeenAssigned = true;
    if (!contest) return Result.fail<IContestEntry>(404, "Contest not found");
    let contestantCode = "";
    while (codeHasBeenAssigned) {
      contestantCode = `${contestant.fullName.substring(
        0,
        1
      )} ${generateRandomNumber(3)}`.toUpperCase();
      const contestCode = await this._contestEntryRepository.findByCriteria({
        contest: contest._id,
        contestantCode,
      });
      if (contestCode) codeHasBeenAssigned = true;
      else codeHasBeenAssigned = false;
    }
    item.contestantCode = contestantCode;
    const newContestEntry = await this._contestEntryRepository.create(item);
    return Result.ok<IContestEntry>(201, newContestEntry);
  }

  async update(
    id: string,
    item: IContestEntry
  ): Promise<Result<IContestEntry>> {
    const contestEntry = await this._contestEntryRepository.findById(id);
    if (!contestEntry)
      return Result.fail<IContestEntry>(
        404,
        `Could not update contest entry.Contest entry with Id ${id} not found`
      );
    const updateObj = await this._contestEntryRepository.update(
      contestEntry._id,
      item
    );
    return Result.ok<IContestEntry>(200, updateObj);
  }

  async patch(id: string, item: any): Promise<Result<IContestEntry>> {
    const contestEntry = await this._contestEntryRepository.findById(id);
    if (!contestEntry)
      return Result.fail<IContestEntry>(
        404,
        `Could not update contest entry.Contest entry with Id ${id} not found`
      );
    const updateObj = await this._contestEntryRepository.update(
      contestEntry._id,
      item
    );

    return Result.ok<IContestEntry>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._contestEntryRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(ContestBusiness);
export = ContestBusiness;
