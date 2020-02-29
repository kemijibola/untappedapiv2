import {
  IVideo,
  IAudio,
  IImage,
  IMedia,
  IContest,
  PaymentStatus
} from "../../app/models/interfaces";
import ContestBusiness from "../../app/business/ContestBusiness";
import { UserListViewModel } from "../../app/models/viewmodels";

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
      isApproved: true,
      paymentStatus: PaymentStatus.Completed
    });
    if (userContests.data) contests = [...contests, ...userContests.data];
    return contests;
  }
}
