import {
  AppUsers,
  UserListRequest,
  UserListViewModel,
  Talent,
  Professional,
} from "../../app/models/viewmodels";
import {
  generateProfessionalReport,
  generateTalentReport,
} from "./Helper/MatchData";
import UserTypeBusiness = require("../../app/business/UserTypeBusiness");
import {
  AccountStatus,
  IUserModel,
  CategoryTypeWithCategory,
  IUserSocialMedia,
  SocialMediaTypes,
} from "../../app/models/interfaces";
import UserBusiness = require("../../app/business/UserBusiness");
import CategoryTypeBusiness = require("../../app/business/CategoryTypeBusiness");
import ProfileBusiness = require("../../app/business/ProfileBusiness");
import { ProfessionalPortfolio } from "../../utils/filtercategory/ProfessionalPortfolio";
import ContestBusiness = require("../../app/business/ContestBusiness");

export class UserFilter {
  constructor() {}

  static initReport(): UserFilter {
    return new UserFilter();
  }

  async generateReport(): Promise<any> {
    try {
      await this.fetchTalents({});
      await this.fetchProfessionals({});
    } catch (err) {
      // log error
      console.log(err);
    }
  }

  private fetchTalents = async (condition: UserListRequest): Promise<void> => {
    try {
      const userTypeBusiness = new UserTypeBusiness();
      var result = await userTypeBusiness.findByCriteria({
        name: AppUsers.Talent,
      });

      if (result.data) {
        let talents = await this.fetchUsers({
          userType: result.data._id,
          isProfileCompleted: true,
          status: AccountStatus.ACTIVATED,
        });
        let users: Talent[] = [];

        if (talents.length > 0) {
          const profileBusiness = new ProfileBusiness();
          for (let x of talents) {
            var userProfile = await profileBusiness.findByUser(x._id);
            const categoryTypes: any = userProfile.data
              ? await this.transformCategoryType(userProfile.data.categoryTypes)
              : [];
            var user: Talent = {
              user: x._id,
              userType: x.userType,
              stageName: userProfile.data ? userProfile.data.name : "",
              displayPhoto: x.profileImagePath || "",
              displayName: x.fullName,
              location: userProfile.data ? userProfile.data.location : "",
              categoryTypes: categoryTypes,
              tapCount: userProfile.data ? userProfile.data.tappedBy.length : 0,
              tappedBy: userProfile.data ? [...userProfile.data.tappedBy] : [],
              shortDescription: userProfile.data
                ? userProfile.data.shortBio
                : "",
              dateJoined: x.createdAt,
            };

            users = [...users, user];
          }
        }
        generateTalentReport(users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  private transformCategoryType = async (
    categories: any
  ): Promise<CategoryTypeWithCategory[]> => {
    const categoryTypeBusiness = new CategoryTypeBusiness();
    let transformed: CategoryTypeWithCategory[] = [];
    for (let item of categories) {
      const found = await categoryTypeBusiness.findById(item);
      if (found.data)
        transformed.push({
          categoryTypeId: found.data._id,
          categoryTypeName: found.data.name,
          category: found.data.category,
        });
    }
    return transformed;
  };

  private fetchProfessionals = async (
    condition: UserListRequest
  ): Promise<void> => {
    try {
      const userTypeBusiness = new UserTypeBusiness();
      const contestBusiness = new ContestBusiness();
      var result = await userTypeBusiness.findByCriteria({
        name: AppUsers.Professional,
      });
      if (result.data) {
        let professionals = await this.fetchUsers({
          userType: result.data._id,
          isEmailConfirmed: true,
          status: AccountStatus.ACTIVATED,
        });

        let users: Professional[] = [];

        if (professionals.length > 0) {
          const profileBusiness = new ProfileBusiness();
          for (let x of professionals) {
            var userProfile = await profileBusiness.findByUser(x._id);
            var professionalSetUp = ProfessionalPortfolio.setUp(x._id);
            var userContests = await professionalSetUp.fetchContestListByUser();
            const categoryTypes: any = userProfile.data
              ? await this.transformCategoryType(userProfile.data.categoryTypes)
              : [];
            let userSocial: IUserSocialMedia[] = [];
            if (userProfile.data) {
              if (userProfile.data.facebook)
                userSocial = [
                  ...userSocial,
                  {
                    type: SocialMediaTypes.facebook,
                    handle: userProfile.data.facebook,
                  },
                ];
              if (userProfile.data.instagram)
                userSocial = [
                  ...userSocial,
                  {
                    type: SocialMediaTypes.instagram,
                    handle: userProfile.data.instagram,
                  },
                ];
              if (userProfile.data.youtube)
                userSocial = [
                  ...userSocial,
                  {
                    type: SocialMediaTypes.youtube,
                    handle: userProfile.data.youtube,
                  },
                ];
              if (userProfile.data.twitter)
                userSocial = [
                  ...userSocial,
                  {
                    type: SocialMediaTypes.twitter,
                    handle: userProfile.data.twitter,
                  },
                ];
              var user: Professional = {
                user: x._id,
                userType: x.userType,
                businessName: userProfile.data.name,
                userSocials: [...userSocial],
                displayPhoto: x.profileImagePath || "",
                displayName: x.fullName,
                bannerPhoto: x.bannerImagePath || "",
                location: userProfile.data.location || "",
                categoryTypes: categoryTypes,
                shortDescription: userProfile.data.shortBio || "",
                dateJoined: x.createdAt,
                contestCount: userContests.length,
                contests: [...userContests],
              };
              users = [...users, user];
            }
          }
        }
        generateProfessionalReport(users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  private fetchUsers = async (
    condition: UserListRequest
  ): Promise<IUserModel[]> => {
    const userBusiness = new UserBusiness();
    const usersModel = await userBusiness.fetch(condition);
    return usersModel.data ? usersModel.data : [];
  };
}
