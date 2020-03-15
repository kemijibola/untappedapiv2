import { Analyzer } from "../Helper/Summary";
import {
  ReportType,
  IUserFilterCategory
} from "../../../app/models/interfaces";
import { MatchData } from "../Helper/MatchData";
import { Talent } from "../../../app/models/viewmodels";

export class AllTalentsAnalysis implements Analyzer {
  async run(users: Talent[]): Promise<IUserFilterCategory[]> {
    var filteredCategories: IUserFilterCategory[] = [];

    users = users.sort((a, b) => {
      return this.getTime(a.dateJoined) - this.getTime(b.dateJoined);
    });

    for (let user of users) {
      const filtered: IUserFilterCategory = Object.assign({
        user: user.user,
        displayName: user.displayName,
        tapCount: user.tapCount,
        aliasName: user.stageName,
        dateJoined: user.dateJoined,
        displayPhoto: user.displayPhoto || "",
        shortDescription: user.shortDescription || "",
        categories: user.categories || [],
        reportType: ReportType.alltalents,
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
