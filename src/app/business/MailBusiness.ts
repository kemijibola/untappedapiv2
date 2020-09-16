import { IEmail, EmailService } from "../../utils/emailservice/EmailService";
import { ses } from "../../utils/emailservice/aws/Sender";

export class MailBusiness {
  private constructor() {}

  static init(): MailBusiness {
    return new MailBusiness();
  }

  async sendMail(
    senderEmail: string,
    senderName: string,
    receivers: string[],
    subject: string,
    mailBody: string
  ) {
    try {
      const mailParams: IEmail = {
        receivers: [...receivers],
        subject,
        mail: mailBody,
        senderEmail,
        senderName,
      };

      const mailer = EmailService.mailer(mailParams);
      await mailer.sendMail(ses);
    } catch (err) {
      // log error
    }
  }
}
