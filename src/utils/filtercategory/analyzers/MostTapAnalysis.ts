import { Analyzer } from "../Helper/Summary";
import {
  ReportType,
  IUserFilterCategory
} from "../../../app/models/interfaces";
import { MatchData } from "../Helper/MatchData";

export class MostTapAnalysis implements Analyzer {
  run(users: MatchData[]): IUserFilterCategory[] {
    var filteredCategories: IUserFilterCategory[] = [];

    users = users.sort((a, b) => {
      return b.tapCount - a.tapCount;
    });
    for (let user of users) {
      const filtered: IUserFilterCategory = Object.assign({
        user: user.user,
        displayName: user.displayName,
        displayPhoto: user.displayPhoto,
        shortDescription: user.shortDescription || "",
        categories: user.categories || [],
        reportType: ReportType.MostTap,
        userType: user.userType
      });
      filteredCategories = [...filteredCategories, filtered];
    }
    return filteredCategories;
  }
}
