import Profile from './Profile';
import {
  IUser,
  ICategory,
  IUserSocialMedia,
  IPhysicalStatistics
} from '../../../app/models/interfaces';

class ProfileBuilder {
  private readonly _user: IUser;
  private _stageName: string = '';
  private _location: string = '';
  private _shortBio: string = '';
  private _categories: ICategory['_id'] = [];
  private _socialMedias: IUserSocialMedia[] = [];
  private _profileImagePath: string = '';
  private _physicalStats: IPhysicalStatistics = {
    bodyType: '',
    color: '',
    height: ''
  };
  private _businessName: string = '';
  private _officialAddress: string = '';
  private _rcNumber: string = '';
  private _phoneNumbers: string[] = [];
  private _bannerImagePath: string = '';

  constructor(user: IUser) {
    this._user = user;
  }

  createTalent(stageName: string, physicalStat: IPhysicalStatistics) {
    this._stageName = stageName;
    this._physicalStats = physicalStat;
    return this;
  }

  createProfessional(
    businessName: string,
    rcNumber: string,
    bannerImage: string,
    officialAddress: string
  ) {
    this._businessName = businessName;
    this._rcNumber = rcNumber;
    this._bannerImagePath = bannerImage;
    this._officialAddress = officialAddress;
    return this;
  }
  createBasicInfo(
    location: string,
    profilePicture: string,
    phoneNumbers: string[],
    shortBio: string,
    categories: ICategory[]
  ) {
    this._location = location;
    this._profileImagePath = profilePicture;
    this._phoneNumbers = phoneNumbers;
    this._shortBio = shortBio;
    this._categories = categories;
    return this;
  }

  get stageName() {
    return this._stageName;
  }

  get location() {
    return this._location;
  }

  get user() {
    return this._user;
  }

  get shortBio() {
    return this._shortBio;
  }

  get categories() {
    return this._categories;
  }

  get socialMedias() {
    return this._socialMedias;
  }

  get profileImagePath() {
    return this._profileImagePath;
  }

  get physicalStatistics() {
    return this._physicalStats;
  }

  get businessName() {
    return this._businessName;
  }

  get officialAddress() {
    return this._officialAddress;
  }

  get rcNumber() {
    return this._rcNumber;
  }

  get phoneNumbers() {
    return this._phoneNumbers;
  }

  get bannerImagePath() {
    return this._bannerImagePath;
  }

  build() {
    return new Profile(this);
  }
}

Object.seal(ProfileBuilder);
export = ProfileBuilder;
