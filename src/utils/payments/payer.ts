import { Result } from "../Result";
import { PaymentProcessorStatus } from "./PaymentFactory";

export interface PaymentGatewayResponse {
  amount: number;
  requestStatus: boolean;
  transactionDate: Date;
  status: PaymentProcessorStatus;
  reference: string;
  gatewayReponse: string;
  channel: string;
  ipAddress: string;
  requestedAmount: number;
  message: string;
}

export abstract class AbstractPayment {
  abstract verifyPayment(referenceNo: string): Promise<PaymentGatewayResponse>;
}

// export class Payer {
//   constructor(public payment: AbstractPayment) {}

//   static init(payment: AbstractPayment): Payer {
//     return new Payer(payment);
//   }

//   async verifyPayment(reference: string): Promise<PaymentGatewayResponse> {
//     return await this.payment.verifyPayment(reference);
//   }
// }
