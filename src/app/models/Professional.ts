import {
  IProfessional,
  IUser,
  ICategory,
  IUserSocialMedia
} from './interfaces';

class ProfessionalModel {
  private _professionalModel: IProfessional;
  constructor(professionalModel: IProfessional) {
    this._professionalModel = professionalModel;
  }

  get businessName(): string {
    return this._professionalModel.businessName;
  }
  get name(): string {
    return this._professionalModel.name;
  }
  get officialAddress(): string {
    return this._professionalModel.officialAddress;
  }
  get rcNumber(): string {
    return this._professionalModel.rcNumber;
  }
  get phoneNumbers(): number[] {
    return this._professionalModel.phoneNumbers;
  }
  get user(): IUser {
    return this._professionalModel.user;
  }
  get shortBio(): string {
    return this._professionalModel.shortBio;
  }
  get categories(): ICategory[] {
    return this._professionalModel.categories;
  }
  get socialMedias(): IUserSocialMedia {
    return this._professionalModel.socialMedias;
  }
  get profileImagePath(): string {
    return this._professionalModel.profileImagePath || '';
  }
  get bannerImagePath(): string {
    return this._professionalModel.bannerImagePath || '';
  }
}

Object.seal(ProfessionalModel);
export = ProfessionalModel;
