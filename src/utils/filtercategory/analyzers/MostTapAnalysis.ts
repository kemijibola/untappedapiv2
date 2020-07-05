import { Analyzer } from "../Helper/Summary";
import {
  ReportType,
  IUserFilterCategory,
} from "../../../app/models/interfaces";
import { MatchData } from "../Helper/MatchData";
import { Talent } from "../../../app/models/viewmodels";

export class MostTapAnalysis implements Analyzer {
  async run(users: Talent[]): Promise<IUserFilterCategory[]> {
    // console.log("most tap", users);
    var filteredCategories: IUserFilterCategory[] = [];

    users = users.sort((a, b) => {
      return b.tapCount - a.tapCount;
    });
    for (let user of users) {
      const filtered: IUserFilterCategory = Object.assign({
        user: user.user,
        displayName: user.displayName,
        tapCount: user.tapCount,
        tappedBy: user.tappedBy,
        aliasName: user.stageName,
        dateJoined: user.dateJoined,
        displayPhoto: user.displayPhoto,
        shortDescription: user.shortDescription,
        categoryTypes: user.categoryTypes || [],
        reportType: ReportType.mosttap,
        userType: user.userType,
      });
      filteredCategories = [...filteredCategories, filtered];
    }
    return filteredCategories;
  }
}
