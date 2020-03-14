import {
  AppUsers,
  UserListRequest,
  UserListViewModel
} from "../../app/models/viewmodels";
import {
  generateProfessionalReport,
  generateTalentReport
} from "./Helper/MatchData";
import UserTypeBusiness = require("../../app/business/UserTypeBusiness");
import { AccountStatus } from "../../app/models/interfaces";
import UserBusiness = require("../../app/business/UserBusiness");
import ProfileBusiness = require("../../app/business/ProfileBusiness");
import { ProfessionalPortfolio } from "../../utils/filtercategory/ProfessionalPortfolio";

export class UserFilter {
  constructor() {}

  static initReport(): UserFilter {
    return new UserFilter();
  }

  async fetchAllTalents(): Promise<any> {
    try {
      // fetch talents for processing
      const userTypeBusiness = new UserTypeBusiness();
      var talentsResult = await userTypeBusiness.findByCriteria({
        name: AppUsers.Talent
      });

      if (talentsResult.data) {
        let talents = await this.fetchUsers({
          userType: talentsResult.data._id
        });
        generateTalentReport(talents);
      }
    } catch (err) {
      // log error
      console.log(err);
    }
  }

  private fetchUsers: any = async (
    condition: UserListRequest
  ): Promise<UserListViewModel[]> => {
    condition.isEmailConfirmed = true;
    condition.isProfileCompleted = true;
    condition.status = AccountStatus.ACTIVATED;
    let users: UserListViewModel[] = [];
    const userBusiness = new UserBusiness();
    const profileBusiness = new ProfileBusiness();
    const usersModel = await userBusiness.fetch(condition);
    if (usersModel.data) {
      for (let x of usersModel.data) {
        var userProfile = await profileBusiness.findByUser(x._id);

        var professionalSetUp = ProfessionalPortfolio.setUp(x._id);
        var userContest = await professionalSetUp.fetchProfessionalContests();

        var user: UserListViewModel = {
          user: x._id,
          userType: x.userType,
          displayPhoto: x.profileImagePath || "",
          displayName: x.fullName,
          categories: userProfile.data ? userProfile.data.categories : [],
          tapCount: userProfile.data ? userProfile.data.tapCount : 0,
          shortDescription: userProfile.data ? userProfile.data.shortBio : "",
          createdAt: x.createdAt,
          contestCount: userContest.length
        };
        users = [...users, user];
      }
    }
    return users;
  };
}
