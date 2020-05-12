import {
  IVideo,
  IAudio,
  IImage,
  IMedia,
  IContest,
  PaymentStatus,
} from "../../app/models/interfaces";
import ContestBusiness from "../../app/business/ContestBusiness";
import { UserListViewModel } from "../../app/models/viewmodels";
import { IUserContestListAnalysis } from "../../app/models/interfaces/custom/ContestList";

export class ProfessionalPortfolio {
  constructor(public userId: string) {}

  static setUp(userId: string): ProfessionalPortfolio {
    return new ProfessionalPortfolio(userId);
  }

  async fetchProfessionalContests(): Promise<IContest[]> {
    let contests: IContest[] = [];
    const contestBusiness = new ContestBusiness();
    const userContests = await contestBusiness.fetch({
      createdBy: this.userId,
      paymentStatus: PaymentStatus.Completed,
    });
    if (userContests.data) contests = [...contests, ...userContests.data];
    return contests;
  }

  async fetchContestListByUser(): Promise<IUserContestListAnalysis[]> {
    let userContests: IUserContestListAnalysis[] = [];
    const contestBusiness = new ContestBusiness();

    const userContestData = await contestBusiness.fetchContestListByUser(
      this.userId
    );

    if (userContestData.data)
      userContests = [...userContests, ...userContestData.data];
    return userContests;
  }
}
