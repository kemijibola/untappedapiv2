import { AbstractPayment, PaymentGatewayResponse } from "../payer";
import { Result } from "../../Result";
import { AppConfig } from "../../../app/models/interfaces/custom/AppConfig";
const config: AppConfig = module.require("../../../config/keys");
import * as request from "request-promise";
import { PaymentProcessorStatus } from "../PaymentFactory";

export class Paystack extends AbstractPayment {
  payStackVerifyUrl = "https://api.paystack.co/transaction/verify";
  constructor() {
    super();
  }

  async verifyPayment(referenceNo: string): Promise<PaymentGatewayResponse> {
    var options = {
      uri: `${this.payStackVerifyUrl}/${referenceNo}`,
      headers: {
        Authorization: `Bearer ${config.PAYMENT_SECRETS.paystack_secret}`,
      },
      json: true,
    };

    try {
      const verified = await request.get(options);
      if (verified.status) {
        return Object.assign({
          amount: verified.data["amount"] / 100,
          requestStatus: verified["status"],
          transactionDate: verified.data["transaction_date"],
          status: verified.data["status"],
          reference: verified.data["reference"],
          gatewayReponse: verified.data["gateway_response"],
          channel: verified.data["channel"],
          ipAddress: verified.data["ip_address"],
          requestedAmount: verified.data["requested_amount"] / 100,
          message: verified.data["message"],
          customerId: verified.data.customer["email"],
        });
      } else {
        return Object.assign({
          amount: 0,
          requestStatus: verified.status,
          transactionDate: new Date(),
          status: PaymentProcessorStatus.failed,
          reference: referenceNo,
          gatewayReponse: verified.message,
          channel: "",
          ipAddress: "",
          requestedAmount: 0,
          message: verified.message,
          customerId: "",
        });
      }
    } catch (err) {
      return Object.assign({
        amount: 0,
        requestStatus: false,
        transactionDate: new Date(),
        status: PaymentProcessorStatus.failed,
        reference: referenceNo,
        gatewayReponse: err,
        channel: "",
        ipAddress: "",
        requestedAmount: 0,
        message: "Error from PayStack",
        customerId: "",
      });
    }
  }
}
