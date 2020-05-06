import { Analyzer } from "../Helper/Summary";
import {
  ReportType,
  IUserFilterCategory,
} from "../../../app/models/interfaces";
import { Professional } from "../../../app/models/viewmodels";

export class AllProfessionalAnalysis implements Analyzer {
  async run(users: Professional[]): Promise<IUserFilterCategory[]> {
    var filteredCategories: IUserFilterCategory[] = [];

    users = users.sort((a, b) => {
      return b.contestCount - a.contestCount;
    });

    for (let user of users) {
      const filtered: IUserFilterCategory = Object.assign({
        user: user.user,
        displayName: user.displayName,
        contestCount: user.contestCount,
        aliasName: user.businessName,
        dateJoined: user.dateJoined,
        displayPhoto: user.displayPhoto,
        shortDescription: user.shortDescription || "",
        categoryTypes: user.categoryTypes || [],
        reportType: ReportType.allprofessionals,
        userType: user.userType,
      });
      filteredCategories = [...filteredCategories, filtered];
    }
    return filteredCategories;
  }
}
