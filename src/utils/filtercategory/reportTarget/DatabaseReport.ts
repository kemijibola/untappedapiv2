import { OutputTarget } from "../Helper/Summary";
import { IUserFilterCategory } from "../../../app/models/interfaces";
import UserFilterCategoryBusiness from "../../../app/business/UserFilterCategoryBusiness";
import { PlatformError } from "../../error";

export class DatabaseReport implements OutputTarget {
  async save(report: IUserFilterCategory[]) {
    try {
      const userFilterBusiness = new UserFilterCategoryBusiness();
      await userFilterBusiness.createMany(report);
    } catch (err) {
      throw new PlatformError({
        code: 500,
        message: err
      });
    }
  }
}
