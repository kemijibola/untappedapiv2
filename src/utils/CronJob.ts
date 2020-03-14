import * as cron from "node-cron";
import { UserFilter } from "./filtercategory/UserFilter";

export const talentFilterJob = () => {
  cron.schedule("* * * * *", async () => {
    var report = UserFilter.initReport();
    await report.fetchAllTalents();
  });
};

// export const professionalFilterJob = () => {
//   cron.schedule("*/10 * * * *", async () => {
//     // var report = UserFilter.
//   });
// };
