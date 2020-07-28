import * as cron from "node-cron";
import { UserFilter } from "./filtercategory/UserFilter";
import { Reconciliation } from "./contests/disbursement/Reconciliation";

export const userFilterJob = () => {
  cron.schedule("*/30 * * * *", async () => {
    var report = UserFilter.initReport();
    await report.generateReport();
  });
};

export const contestSettlement = () => {
  cron.schedule("*/1 * * * *", async () => {
    var report = Reconciliation.init();
    await report.settle();
  });
};
// export const professionalFilterJob = () => {
//   cron.schedule("*/10 * * * *", async () => {
//     // var report = UserFilter.
//   });
// };
