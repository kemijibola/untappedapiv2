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
  customerId: string;
}

export enum TransferStatusType {
  pending = "pending",
  success = "success",
}

export enum PaymentGatewayType {
  paystack = "paystack",
  flutterwave = "flutterwave",
}
export interface Bank {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  active: boolean;
  is_deleted: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export const PaystackWebhookEvent = {
  "transfer.success": "transfer.success",
  "transfer.failed": "transfer.failed",
};
export interface UserAccount {
  account_number: string;
  account_name: string;
  bank_id: number;
}

export interface PaystackBankResponse {
  status: boolean;
  message: string;
  data: Bank[];
}

export interface PaystackTransferRecipientResponse {
  status: boolean;
  message: string;
  data: PaystackTransferRecipient;
}

export interface PaystackTransactionFailedResponse {
  event: string;
  data: PaystackTransactionFailed;
}

export interface PaystackTransactionFailed {
  domain: string;
  amount: number;
  currency: string;
  recipient: PaystackTransactionRecipient;
  status: string;
  transfer_code: string;
  transferred_at: string;
  created_at: string;
}

export interface PaystackTransactionRecipient {
  domain: string;
  type: string;
  currency: string;
  name: string;
  details: PaystackTransactionRecipientDetails;
  description: string;
  metadata: string;
  recipient_code: string;
  active: boolean;
}

export interface PaystackTransactionRecipientDetails {
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
}

export interface PaystackTransferRecipient {
  active: boolean;
  createdAt: string;
  currency: string;
  recipient_code: string;
  type: string;
  is_deleted: boolean;
  details: RecipientDetails;
}

export interface PaystackTransferResponse {
  status: boolean;
  message: string;
  data: TransferResponse;
}

export interface TransferResponse {
  reference: string;
  amount: number;
  currency: string;
  source: string;
  reason: string;
  recipient: string;
  status: string;
  transfer_code: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecipientDetails {
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
}

export interface PaystackAccountVerifyResponse {
  status: boolean;
  message: string;
  data: UserAccount;
}

export abstract class AbstractPayment {
  abstract verifyPayment(referenceNo: string): Promise<PaymentGatewayResponse>;
  abstract fetchBanks(): Promise<PaystackBankResponse>;
  abstract verifyAccountNmber(
    accountNmber: string,
    bankCode: string
  ): Promise<PaystackAccountVerifyResponse>;
  abstract createTransferRecipient(
    type: string,
    name: string,
    accountNumber: string,
    bankCode: string
  ): Promise<PaystackTransferRecipientResponse>;
  abstract transferFund(
    source: string,
    amount: number,
    recipient: string,
    reason: string
  ): Promise<PaystackTransferResponse>;
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
