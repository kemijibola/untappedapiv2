import { Handler, Context, Callback } from "aws-lambda";
import { TalentPortfolio } from "./TalentPortfolio";
import { Summary } from "./Helper/Summary";
// import { MostTapAnalysis } from "./analyzers/MostTapAnalysis";
import { HighestCommentAnalysis } from "./analyzers/HighestCommentAnalysis";
import { DatabaseReport } from "./reportTarget/DatabaseReport";
import {
  generateTalentReport,
  generateProfessionalReport
} from "./Helper/MatchData";
import {
  UserListViewModel,
  UserListRequest,
  AppUsers
} from "../../app/models/viewmodels";
import { AccountStatus, PaymentStatus } from "../../app/models/interfaces";
import UserBusiness = require("../../app/business/UserBusiness");
import UserTypeBusiness = require("../../app/business/UserTypeBusiness");
import ProfileBusiness = require("../../app/business/ProfileBusiness");
import { ProfessionalPortfolio } from "./ProfessionalPortfolio";

export const fetchTalentsByCategory: Handler = async (
  event: any,
  context: Context,
  cb: Callback
): Promise<any> => {
  try {
    // fetch talents for processing
    const userTypeBusiness = new UserTypeBusiness();
    var talentsResult = await userTypeBusiness.findByCriteria({
      name: AppUsers.Talent
    });
    console.log("users from handler");
    if (talentsResult.data) {
      let talents = await fetchUsers({ userType: talentsResult.data._id });

      generateTalentReport(talents);
    }

    // fetch professionals for processing
    const professionalResult = await userTypeBusiness.findByCriteria({
      name: AppUsers.Professional
    });
    if (professionalResult.data) {
      const professionals = await fetchUsers({
        userType: professionalResult.data._id
      });
      generateProfessionalReport(professionals);
    }
  } catch (err) {
    // do nothing
    console.log(err);
  }
};

export const fetchUsers: any = async (
  condition: UserListRequest
): Promise<UserListViewModel[]> => {
  condition.isEmailConfirmed = true;
  condition.isProfileCompleted = true;
  condition.status = AccountStatus.ACTIVATED;
  let users: UserListViewModel[] = [];
  const userBusiness = new UserBusiness();
  const profileBusiness = new ProfileBusiness();
  const usersModel = await userBusiness.fetch(condition);
  console.log("users from handler", usersModel);
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
