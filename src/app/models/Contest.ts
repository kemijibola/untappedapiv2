import {
  IContest,
  ICategory,
  IRedeemable,
  IUser,
  IEvaluation
} from './interfaces';

class ContestModel {
  private _contestModel: IContest;
  constructor(contestModel: IContest) {
    this._contestModel = contestModel;
  }

  get title(): string {
    return this._contestModel.title;
  }
  get information(): string {
    return this._contestModel.information;
  }
  get bannerImage(): string {
    return this._contestModel.bannerImage;
  }
  get eligibleCategories(): ICategory[] {
    return this._contestModel.eligibleCategories;
  }
  get eligibilityInfo(): string {
    return this._contestModel.eligibilityInfo;
  }
  get submissionRules(): string {
    return this._contestModel.submissionRules;
  }
  get startDate(): Date {
    return this._contestModel.startDate;
  }
  get duration(): number {
    return this._contestModel.duration;
  }
  get redeemable(): IRedeemable {
    return this._contestModel.redeemable;
  }
  get endDate(): Date {
    return this._contestModel.endDate;
  }
  get createdBy(): IUser {
    return this._contestModel.createdBy;
  }
  get maxContestant(): number {
    return this._contestModel.maxContestant || 0;
  }
  get grandFinaleDate(): Date {
    return this._contestModel.grandFinaleDate || new Date();
  }
  get grandFinaleLocation(): string {
    return this._contestModel.grandFinaleLocation || '';
  }
  get evaluations(): IEvaluation[] {
    return this._contestModel.evaluations || [];
  }
}

Object.seal(ContestModel);
export = ContestModel;
