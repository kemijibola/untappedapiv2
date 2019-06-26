import {
  ITalent,
  IUser,
  ICategory,
  IUserSocialMedia,
  IPhysicalStatistics
} from './interfaces';

class TalentModel {
  private _talentModel: ITalent;
  constructor(talentModel: ITalent) {
    this._talentModel = talentModel;
  }

  get stageName(): string {
    return this._talentModel.stageName || '';
  }
  get location(): string {
    return this._talentModel.location;
  }
  get phoneNumber(): string {
    return this._talentModel.phoneNumber;
  }
  get user(): IUser {
    return this._talentModel.user;
  }
  get shortBio(): string {
    return this._talentModel.shortBio || '';
  }
  get categories(): ICategory[] {
    return this._talentModel.categories;
  }
  get socialMedias(): IUserSocialMedia {
    return this._talentModel.socialMedias || Object();
  }
  get profileImagePath(): string {
    return this._talentModel.profileImagePath || '';
  }
  get physicalStats(): IPhysicalStatistics {
    return this._talentModel.physicalStats;
  }
}

Object.seal(TalentModel);
exports = TalentModel;
