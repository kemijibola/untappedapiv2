import { AbstractPayment, PaymentGatewayResponse } from "../payer";
import { Result } from "../../Result";
import { AppConfig } from "../../../app/models/interfaces/custom/AppConfig";
const config: AppConfig = module.require("../../../config/keys");
import * as request from "request-promise";
import { PaymentProcessorStatus } from "../PaymentFactory";
import { map } from "bluebird";

export class Paystack extends AbstractPayment {
  payStackVerifyUrl = "https://api.paystack.co/transaction/verify";
  constructor() {
    super();
  }

  async verifyPayment(referenceNo: string): Promise<PaymentGatewayResponse> {
    console.log("reference no", referenceNo);
    let payStackResponse: PaymentGatewayResponse = {
      amount: 0,
      requestStatus: false,
      transactionDate: new Date(),
      status: PaymentProcessorStatus.pending,
      reference: "",
      gatewayReponse: "",
      channel: "",
      ipAddress: "",
      requestedAmount: 0,
      message: "",
    };

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
        payStackResponse = {
          amount: verified.data.amount / 100,
          requestStatus: verified.status,
          transactionDate: verified.data.transaction_date,
          status: verified.data.status,
          reference: verified.data.reference,
          gatewayReponse: verified.data.gateway_response,
          channel: verified.data.channel,
          ipAddress: verified.data.ip_address,
          requestedAmount: verified.data.requested_amount,
          message: verified.data.message,
        };
      } else {
        payStackResponse = {
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
        };
      }
      return payStackResponse;
    } catch (err) {
      payStackResponse = {
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
      };
      return payStackResponse;
    }
  }
}
