import ContestEntryBusiness = require("../../../app/business/ContestEntryBusiness");
import ContestBusiness = require("../../../app/business/ContestBusiness");
import WalletBusiness = require("../../../app/business/WalletDataBusiness");
import VoteTransactionBusiness = require("../../../app/business/VoteTransactionBusiness");
import TransactionRequestBusiness = require("../../../app/business/TransactionRequestBusiness");
import { isFuture, startOfToday } from "date-fns";
import {
  PaymentStatus,
  IContest,
  EntryPosition,
  PrizePosition,
  TransactionRequest,
} from "../../../app/models/interfaces";
import { IContestContestant } from "../../../app/models/interfaces/custom/ContestList";
import {
  PaymentProviderStatus,
  TransctionType,
} from "../../../app/models/interfaces/custom/TransactionDTO";
import { generateRandomNumber } from "../../lib/Helper";
import { EmailService, IEmail } from "../../emailservice/EmailService";
import { ses } from "../../emailservice/aws/Sender";

export class Reconciliation {
  constructor() {}

  static init(): Reconciliation {
    return new Reconciliation();
  }

  async settle(): Promise<any> {
    try {
      await this.fetchRecentlyEndedContest({});
    } catch (err) {
      // log error
      console.log(err);
    }
  }

  private fetchRecentlyEndedContest = async (condition: any): Promise<void> => {
    try {
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.fetch({
        paymentStatus: PaymentStatus.Completed,
        approved: true,
        endDate: { $gte: startOfToday(), $lte: new Date() },
      });
      if (result.data) {
        for (let contest of result.data) {
          if (isFuture(contest.endDate)) return;
          this.fetchContestFinalist(contest);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  private fetchContestFinalist = async (contest: IContest): Promise<void> => {
    try {
      var prizeRedeemed = false;
      const contestEntryBusiness = new ContestEntryBusiness();
      const voteTransactionBusiness = new VoteTransactionBusiness();

      const contestEntries = await contestEntryBusiness.fetchContestEntries({
        contest: contest._id,
        approved: true,
      });
      const contestFinalist = await voteTransactionBusiness.fetchTopContestants(
        contest._id,
        contestEntries,
        contest.redeemable.length
      );
      for (let item of contestFinalist) {
        if (item.prizeRedeemed) {
          prizeRedeemed = true;
        }
      }
      if (!prizeRedeemed) this.updateEntryPosition(contest, contestFinalist);
    } catch (err) {
      console.log(err);
    }
  };

  private updateEntryPosition = async (
    contest: IContest,
    contestants: IContestContestant[]
  ): Promise<void> => {
    try {
      const contestEntryBusiness = new ContestEntryBusiness();
      const walletBusiness = new WalletBusiness();
      for (let i = 0; i < contestants.length; i++) {
        if (i === 0 && !contestants[i].prizeRedeemed) {
          await contestEntryBusiness.patch(contestants[i].entryId, {
            position: EntryPosition.firstplace,
          });

          const contestantWallet = await walletBusiness.findByCriteria({
            user: contestants[i].contestant,
          });
          if (contestantWallet.data) {
            if (
              contestantWallet.data.status === PaymentProviderStatus.activated
            ) {
              const prizeMoney = contest.redeemable.filter(
                (x) => x.name === PrizePosition.position1
              )[0];
              const walletBalance: any = contestantWallet.data.balance;

              contestantWallet.data.balance =
                walletBalance + prizeMoney.prizeCash;

              await walletBusiness.update(
                contestantWallet.data._id,
                contestantWallet.data
              );

              await contestEntryBusiness.patch(contestants[i].entryId, {
                prizeRedeemed: true,
              });

              // create transaction request
              await this.createTransaction(
                contestantWallet.data.user,
                prizeMoney.prizeCash,
                `1st Place - ${contest.title}`
              );
              // send mail to winner
            }
          }
        }
        if (i === 1 && !contestants[i].prizeRedeemed) {
          await contestEntryBusiness.patch(contestants[i].entryId, {
            position: EntryPosition.secondplace,
          });

          const contestantWallet = await walletBusiness.findByCriteria({
            user: contestants[i].contestant,
          });
          if (contestantWallet.data) {
            if (
              contestantWallet.data.status === PaymentProviderStatus.activated
            ) {
              const prizeMoney = contest.redeemable.filter(
                (x) => x.name === PrizePosition.position2
              )[0];
              const walletBalance: any = contestantWallet.data.balance;

              contestantWallet.data.balance =
                walletBalance + prizeMoney.prizeCash;

              await walletBusiness.update(
                contestantWallet.data._id,
                contestantWallet.data
              );

              await contestEntryBusiness.patch(contestants[i].entryId, {
                prizeRedeemed: true,
              });

              await this.createTransaction(
                contestantWallet.data.user,
                prizeMoney.prizeCash,
                `2nd Place - ${contest.title}`
              );
            }
          }
        }
        if (i === 2 && !contestants[i].prizeRedeemed) {
          await contestEntryBusiness.patch(contestants[i].entryId, {
            position: EntryPosition.thirdplace,
          });

          const contestantWallet = await walletBusiness.findByCriteria({
            user: contestants[i].contestant,
          });
          if (contestantWallet.data) {
            if (
              contestantWallet.data.status === PaymentProviderStatus.activated
            ) {
              const prizeMoney = contest.redeemable.filter(
                (x) => x.name === PrizePosition.position3
              )[0];
              const walletBalance: any = contestantWallet.data.balance;

              contestantWallet.data.balance =
                walletBalance + prizeMoney.prizeCash;

              await walletBusiness.update(
                contestantWallet.data._id,
                contestantWallet.data
              );

              await contestEntryBusiness.patch(contestants[i].entryId, {
                prizeRedeemed: true,
              });

              await this.createTransaction(
                contestantWallet.data.user,
                prizeMoney.prizeCash,
                `3rd Place - ${contest.title}`
              );
            }
          }
        }
        if (i === 3 && !contestants[i].prizeRedeemed) {
          await contestEntryBusiness.patch(contestants[i].entryId, {
            position: EntryPosition.fourthplace,
          });

          const contestantWallet = await walletBusiness.findByCriteria({
            user: contestants[i].contestant,
          });
          if (contestantWallet.data) {
            if (
              contestantWallet.data.status === PaymentProviderStatus.activated
            ) {
              const prizeMoney = contest.redeemable.filter(
                (x) => x.name === PrizePosition.position4
              )[0];
              const walletBalance: any = contestantWallet.data.balance;

              contestantWallet.data.balance =
                walletBalance + prizeMoney.prizeCash;

              await walletBusiness.update(
                contestantWallet.data._id,
                contestantWallet.data
              );

              await contestEntryBusiness.patch(contestants[i].entryId, {
                prizeRedeemed: true,
              });

              await this.createTransaction(
                contestantWallet.data.user,
                prizeMoney.prizeCash,
                `4th Place - ${contest.title}`
              );
            }
          }
        }
        if (i === 4 && !contestants[i].prizeRedeemed) {
          await contestEntryBusiness.patch(contestants[i].entryId, {
            position: EntryPosition.fifthplace,
          });

          const contestantWallet = await walletBusiness.findByCriteria({
            user: contestants[i].contestant,
          });
          if (contestantWallet.data) {
            if (
              contestantWallet.data.status === PaymentProviderStatus.activated
            ) {
              const prizeMoney = contest.redeemable.filter(
                (x) => x.name === PrizePosition.position5
              )[0];
              const walletBalance: any = contestantWallet.data.balance;

              contestantWallet.data.balance =
                walletBalance + prizeMoney.prizeCash;

              await walletBusiness.update(
                contestantWallet.data._id,
                contestantWallet.data
              );

              await contestEntryBusiness.patch(contestants[i].entryId, {
                prizeRedeemed: true,
              });

              await this.createTransaction(
                contestantWallet.data.user,
                prizeMoney.prizeCash,
                `5th Place - ${contest.title}`
              );
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  private createTransaction = async (
    userId: string,
    amount: number,
    narration: string
  ): Promise<void> => {
    try {
      const transactionObj: TransactionRequest = Object.assign({
        user: userId,
        amount,
        paymentReference: generateRandomNumber(12),
        narration: narration,
        paymentChannel: "web",
        transactionType: TransctionType.credit,
        responseCode: 200,
        responseMessage: "Successful",
        currency: "NGN",
        transactionDate: new Date(),
        transactionStatus: "success",
      });
      var transactionRequestBusiness = new TransactionRequestBusiness();
      await transactionRequestBusiness.create(transactionObj);
    } catch (err) {
      console.log(err);
    }
  };

  private sendMail = async (
    receivers: string[],
    subject: string,
    mailBody: string
  ): Promise<void> => {
    try {
      const mailParams: IEmail = {
        receivers: [...receivers],
        subject,
        mail: mailBody,
        senderEmail: "contest@untappedpool.com",
        senderName: "Untapped Pool",
      };

      const mailer = EmailService.mailer(mailParams);
      await mailer.sendMail(ses);
    } catch (err) {
      console.log(err);
    }
  };
}
