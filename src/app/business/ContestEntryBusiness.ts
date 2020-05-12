import ContestEntryRepository from "../repository/ContestEntryRepository";
import ContestRepository from "../repository/ContestRepository";
import ProfileRepository from "../repository/ProfileRepository";
import UserRepository from "../repository/UserRepository";
import UserTypeRepository from "../repository/UserTypeRepository";
import CommentRepository from "../repository/CommentRepository";
import IContestEntryBusiness = require("./interfaces/ContestEntryBusiness");
import {
  IContestEntry,
  ContestEligibilityData,
  EligibilityStatus,
  IComment,
} from "../models/interfaces";
import { Result } from "../../utils/Result";
import { generateRandomNumber, ObjectKeyString } from "../../utils/lib";
import { IUserContestListAnalysis } from "../models/interfaces/custom/ContestList";

class ContestBusiness implements IContestEntryBusiness {
  private _contestEntryRepository: ContestEntryRepository;
  private _contestRepository: ContestRepository;
  private _userRepository: UserRepository;
  private _profileRepository: ProfileRepository;
  private _userTypeRepository: UserTypeRepository;
  private _commentRepository: CommentRepository;

  constructor() {
    this._contestEntryRepository = new ContestEntryRepository();
    this._contestRepository = new ContestRepository();
    this._userRepository = new UserRepository();
    this._profileRepository = new ProfileRepository();
    this._userTypeRepository = new UserTypeRepository();
    this._commentRepository = new CommentRepository();
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
      return Result.fail<IContestEntry>(404, "Contest entry not found");
    return Result.ok<IContestEntry>(200, contestEntry);
  }

  async checkUserEligibility(
    contestId: string,
    userId: string
  ): Promise<Result<ContestEligibilityData>> {
    let isEligible = true;
    let eligibleCategoriesMap: ObjectKeyString = {};
    let eligibilityData: ContestEligibilityData = {
      status: true,
      eligibility: EligibilityStatus.eligible,
      message: "",
    };
    const contest = await this._contestRepository.findById(contestId);
    console.log(contest);
    if (!contest) Result.fail<IContestEntry>(404, "Contest not found");

    const contestantProfile = await this._profileRepository.findByCriteria({
      user: userId,
    });
    if (!contestantProfile)
      Result.fail<IContestEntry>(404, "Contestant profile not found");

    const contestant = await this._userRepository.findById(userId);

    const userType = await this._userTypeRepository.findByCriteria({
      name: "Talent",
    });

    if (contestant.userType !== userType._id)
      Result.fail<IContestEntry>(400, "User is not registered as a Talent");

    const alreadyVoted = await this._contestEntryRepository.findByCriteria({
      user: contestant._id,
      contest: contest._id,
    });

    if (alreadyVoted) {
      eligibilityData.status = false;
      eligibilityData.eligibility = EligibilityStatus.entered;
      eligibilityData.message = "User already entered contest.";
      return Result.ok<ContestEligibilityData>(200, eligibilityData);
    }

    const eligibleCategories: string[] = contest.eligibleCategories;
    if (eligibleCategories.length > 0) {
      const contestantCategories: string[] =
        contestantProfile.categoryTypes || [];
      for (let item of eligibleCategories) {
        if (!eligibleCategoriesMap[item]) {
          eligibleCategoriesMap[item] = item;
        }
      }

      const talentIsEligible = this.checkIfTalentCategoryEligibility(
        contestantCategories,
        eligibleCategoriesMap
      );
      if (!talentIsEligible) {
        eligibilityData.status = false;
        eligibilityData.eligibility = EligibilityStatus.noteligible;
        eligibilityData.message = "Contestant is not eligible.";
      }
    }
    return Result.ok<ContestEligibilityData>(200, eligibilityData);
  }

  private checkIfTalentCategoryEligibility(
    talentCategories: string[],
    contestCategory: ObjectKeyString
  ): boolean {
    for (let talentCategory of talentCategories) {
      if (contestCategory[talentCategory]) {
        return true;
      }
    }
    return false;
  }

  async fetchContestEntryListByUser(
    userId: string
  ): Promise<Result<IUserContestListAnalysis[]>> {
    let totalCommentCount: number = 0;
    let contestEntryCommentCountMap: any = {};
    let userContestResults: IUserContestListAnalysis[] = [];

    const userContestEntries: IContestEntry[] = await this._contestEntryRepository.fetchContestEntryWithContest(
      {
        user: userId,
      }
    );

    contestEntryCommentCountMap["totalCommentCount"] = 0;
    for (let item of userContestEntries) {
      const contestEntries: IContestEntry[] = await this._contestEntryRepository.fetch(
        {
          contest: item.contest,
        }
      );

      const entryComment: IComment[] = await this._commentRepository.fetch({
        entity: item._id,
      });
      contestEntryCommentCountMap["totalCommentCount"] =
        contestEntryCommentCountMap["totalCommentCount"] + entryComment.length;

      let userContestResult: IUserContestListAnalysis = {
        contestId: item._id,
        contestTitle: item.title,
        contestBanner: item.contest.bannerImage || "",
        contestViewCount: item.contest.views || 0,
        contestLikedByCount: item.contest.likedBy.length || 0,
        entryCount: contestEntries.length,
        commentCount: contestEntryCommentCountMap["totalCommentCount"],
      };
      userContestResults = [...userContestResults, userContestResult];
    }
    return Result.ok<IUserContestListAnalysis[]>(200, userContestResults);
  }

  async create(item: IContestEntry): Promise<Result<IContestEntry>> {
    const contest = await this._contestRepository.findById(item.contest);
    const contestant = await this._userRepository.findById(item.user);
    if (!contestant)
      return Result.fail<IContestEntry>(404, "Contestant not found");
    const alreadyVoted = await this._contestRepository.findByCriteria({
      user: contestant._id,
      contest: contest._id,
    });
    if (alreadyVoted) {
      Result.fail<IContestEntry>(
        409,
        "Contestant has already entered competition."
      );
    }
    let codeHasBeenAssigned = true;
    if (!contest) return Result.fail<IContestEntry>(404, "Contest not found");
    let contestantCode = "";
    while (codeHasBeenAssigned) {
      contestantCode = `${contestant.fullName.substring(
        0,
        2
      )}${generateRandomNumber(2)}`.toUpperCase();
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
