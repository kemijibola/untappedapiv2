import {
  AppUsers,
  UserListRequest,
  UserListViewModel,
  Talent,
  Professional
} from "../../app/models/viewmodels";
import {
  generateProfessionalReport,
  generateTalentReport
} from "./Helper/MatchData";
import UserTypeBusiness = require("../../app/business/UserTypeBusiness");
import { AccountStatus, IUserModel } from "../../app/models/interfaces";
import UserBusiness = require("../../app/business/UserBusiness");
import ProfileBusiness = require("../../app/business/ProfileBusiness");
import { ProfessionalPortfolio } from "../../utils/filtercategory/ProfessionalPortfolio";

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
        name: AppUsers.Talent
      });

      if (result.data) {
        let talents = await this.fetchUsers({
          userType: result.data._id
        });
        let users: Talent[] = [];

        if (talents.length > 0) {
          const profileBusiness = new ProfileBusiness();
          for (let x of talents) {
            var userProfile = await profileBusiness.findByUser(x._id);
            var user: Talent = {
              user: x._id,
              userType: x.userType,
              stageName: userProfile.data ? userProfile.data.name : "",
              displayPhoto: x.profileImagePath || "",
              displayName: x.fullName,
              categories: userProfile.data ? userProfile.data.categories : [],
              tapCount: userProfile.data ? userProfile.data.tapCount : 0,
              shortDescription: userProfile.data
                ? userProfile.data.shortBio
                : "",
              dateJoined: x.createdAt
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

  private fetchProfessionals = async (
    condition: UserListRequest
  ): Promise<void> => {
    try {
      const userTypeBusiness = new UserTypeBusiness();
      var result = await userTypeBusiness.findByCriteria({
        name: AppUsers.Professional
      });

      if (result.data) {
        let professionals = await this.fetchUsers({
          userType: result.data._id
        });

        let users: Professional[] = [];

        if (professionals.length > 0) {
          const profileBusiness = new ProfileBusiness();
          for (let x of professionals) {
            var userProfile = await profileBusiness.findByUser(x._id);
            var professionalSetUp = ProfessionalPortfolio.setUp(x._id);
            var userContest = await professionalSetUp.fetchProfessionalContests();

            var user: Professional = {
              user: x._id,
              userType: x.userType,
              businessName: userProfile.data ? userProfile.data.name : "",
              displayPhoto: x.profileImagePath || "",
              displayName: x.fullName,
              categories: userProfile.data ? userProfile.data.categories : [],
              shortDescription: userProfile.data
                ? userProfile.data.shortBio
                : "",
              dateJoined: x.createdAt,
              contestCount: userContest.length
            };
            users = [...users, user];
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
    condition.isEmailConfirmed = true;
    condition.isProfileCompleted = true;
    condition.status = AccountStatus.ACTIVATED;
    const userBusiness = new UserBusiness();
    const usersModel = await userBusiness.fetch(condition);
    return usersModel.data ? usersModel.data : [];
  };
}
