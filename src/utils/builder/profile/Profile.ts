import {
  IUser,
  ICategory,
  IUserSocialMedia,
  IPhysicalStatistics
} from '../../../app/models/interfaces';
import ProfileBuilder from './ProfileBuilder';

class Profile {
  stageName: string;
  location: string;
  user: IUser['_id'];
  shortBio: string;
  categories: ICategory['_id'];
  socialMedias: IUserSocialMedia[];
  profileImagePath: string;
  physicalStatistics: IPhysicalStatistics;
  businessName: string;
  officialAddress: string;
  rcNumber: string;
  phoneNumbers: string[];
  bannerImagePath: string;

  constructor(builder: ProfileBuilder) {
    this.stageName = builder.stageName;
    this.location = builder.location;
    this.user = builder.user;
    this.shortBio = builder.shortBio;
    this.categories = builder.categories;
    this.socialMedias = builder.socialMedias;
    this.profileImagePath = builder.profileImagePath;
    this.physicalStatistics = builder.physicalStatistics;
    this.businessName = builder.businessName;
    this.officialAddress = builder.officialAddress;
    this.rcNumber = builder.rcNumber;
    this.phoneNumbers = builder.phoneNumbers;
    this.bannerImagePath = builder.bannerImagePath;
  }
}

Object.seal(Profile);
export = Profile;
