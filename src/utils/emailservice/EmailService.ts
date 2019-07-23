export interface IEmail {
  receivers: string[];
  subject: string;
  body: string;
  senderEmail: string;
  senderName: string;
  ccAddresses?: string[];
  bccAddresses?: string[];
}

export type Sender = (
  receivers: string[],
  subject: string,
  body: string,
  senderEmail: string,
  ccAddresses?: string[],
  bccAddresses?: string[],
  senderName?: string
) => Promise<void>;

export class EmailService {
  private receivers: string[] = [];
  private subject: string = '';
  private body: string = '';
  private senderEmail: string = '';
  private ccAddresses?: string[] = [];
  private bccAddresses?: string[] = [];

  constructor(params: IEmail) {
    this.receivers = params.receivers;
    this.subject = params.subject;
    this.body = params.body;
    this.senderEmail = params.senderEmail;
    this.ccAddresses = params.ccAddresses;
    this.bccAddresses = params.bccAddresses;
  }

  static mailer(params: IEmail): EmailService {
    console.log('this is params');
    return new EmailService(params);
  }
  async sendMail(send: Sender): Promise<any> {
    return send(
      this.receivers,
      this.subject,
      this.body,
      this.senderEmail,
      this.ccAddresses,
      this.bccAddresses
    );
  }
}
