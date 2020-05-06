import { OutputTarget } from "../Helper/Summary";
import { IUserFilterCategory } from "../../../app/models/interfaces";
import UserFilterCategoryBusiness from "../../../app/business/UserFilterCategoryBusiness";
import { PlatformError } from "../../error";

export class DatabaseReport implements OutputTarget {
  async save(report: IUserFilterCategory[]) {
    try {
      if (report.length > 0) {
        // delete existing report before saving new to db
        const userFilterBusiness = new UserFilterCategoryBusiness();
        await userFilterBusiness.deleteMany({
          reportType: report[0].reportType,
        });
        await userFilterBusiness.createMany(report);
      }
    } catch (err) {
      console.log(err);
      // throw new PlatformError({
      //   code: 500,
      //   message: err,
      // });
    }
  }
}
