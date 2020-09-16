import {
  IOrder,
  ServiceType,
  PaymentStatus,
} from "../../app/models/interfaces";
import ContestRepository from "../../app/repository/ContestRepository";
import { getRandomId } from "../lib/Helper";

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
          this._contestRepository.patch(item, {
            paymentStatus: PaymentStatus.Completed,
            code: getRandomId(),
          });
        }
      }
    } catch (err) {
      return;
    }
  }
}
