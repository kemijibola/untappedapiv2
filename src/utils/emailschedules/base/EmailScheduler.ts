export interface IEmail {
  receivers: string[];
  subject: string;
  htmlBody: string;
  textBody?: string;
  senderEmail: string;
  senderName: string;
  ccAddresses?: string[];
  bccAddresses?: string[];
}

export interface IEmailScheduler {
  sendEmail(email: IEmail): Promise<string>;
}

export class EmailScheduler {
  constructor(public scheduler: IEmailScheduler) {}

  static mailer(scheduler: IEmailScheduler): EmailScheduler {
    return new EmailScheduler(scheduler);
  }

  send(email: IEmail): void {
    this.scheduler.sendEmail(email);
  }
}
