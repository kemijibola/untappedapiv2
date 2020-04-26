import {
  IOrder,
  ServiceType,
  PaymentStatus,
} from "../../app/models/interfaces";
import ContestBusiness = require("../../app/business/ContestBusiness");
import ContestRepository from "../../app/repository/ContestRepository";

export class SettlementHandler {
  private _contestRepository: ContestRepository;
  constructor() {
    this._contestRepository = new ContestRepository();
  }

  static initialize(): SettlementHandler {
    return new SettlementHandler();
  }

  async process(item: string, serviceType: string) {
    try {
      if (serviceType === ServiceType.contest) {
        var updateObj = await this._contestRepository.findById(item);
        if (updateObj) {
          var updateContest = this._contestRepository.patch(item, {
            paymentStatus: PaymentStatus.Completed,
          });
        }
      }
    } catch (err) {
      return;
    }
  }
}
