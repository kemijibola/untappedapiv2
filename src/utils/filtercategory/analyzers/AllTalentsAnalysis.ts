import { Analyzer } from "../Helper/Summary";
import {
  ReportType,
  IUserFilterCategory
} from "../../../app/models/interfaces";
import { MatchData } from "../Helper/MatchData";

export class AllTalentsAnalysis implements Analyzer {
  run(users: MatchData[]): IUserFilterCategory[] {
    var filteredCategories: IUserFilterCategory[] = [];

    users = users.sort((a, b) => {
      return this.getTime(a.createdAt) - this.getTime(b.createdAt);
    });

    for (let user of users) {
      const filtered: IUserFilterCategory = Object.assign({
        user: user.user,
        displayName: user.displayName,
        displayPhoto: user.displayPhoto,
        shortDescription: user.shortDescription || "",
        categories: user.categories || [],
        reportType: ReportType.AllTalents,
        userType: user.userType
      });
      filteredCategories = [...filteredCategories, filtered];
    }
    return filteredCategories;
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }
}
