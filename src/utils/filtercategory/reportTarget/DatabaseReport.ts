import { OutputTarget } from "../Helper/Summary";
import { IUserFilterCategory } from "../../../app/models/interfaces";
import UserFilterCategoryBusiness from "../../../app/business/UserFilterCategoryBusiness";

export class DatabaseReport implements OutputTarget {
  async process(report: IUserFilterCategory) {
    const talentFilterCategoryBusiness = new UserFilterCategoryBusiness();
    await talentFilterCategoryBusiness.create(report);
  }
}
