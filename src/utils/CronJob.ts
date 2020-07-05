import * as cron from "node-cron";
import { UserFilter } from "./filtercategory/UserFilter";

export const userFilterJob = () => {
  cron.schedule("*/1 * * * *", async () => {
    var report = UserFilter.initReport();
    await report.generateReport();
  });
};

// export const professionalFilterJob = () => {
//   cron.schedule("*/10 * * * *", async () => {
//     // var report = UserFilter.
//   });
// };
