import { Paystack } from "./paymentTypes/paystack";
import { AbstractPayment } from "./payer";
import { PlatformError } from "../error";

export enum PaymentProcessor {
  paystack = "paystack",
  flutterwave = "flutterwave",
  banktransfer = "banktransfer",
}

export enum PaymentProcessorStatus {
  success = "success",
  abandoned = "abandoned",
  failed = "failed",
  pending = "pending",
}

export class PaymentFactory {
  create(processor: string): AbstractPayment {
    console.log(processor);
    if (processor === "paystack") {
      return new Paystack();
    } else {
      throw new PlatformError({
        code: 400,
        message: "Payment processor is invalid.",
      });
    }
  }
}
