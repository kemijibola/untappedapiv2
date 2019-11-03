export interface SecretKey {
  KID: string;
  SECRET: string;
}

export interface AppConfig {
  PORT: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  RSA_PUBLIC: RsaSecret[];
  RSA_PRIVATE: RsaSecret[];
  DATABASE_HOST: string;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  ISSUER: string;
  AUTH_EXPIRESIN: string;
  MAIL_EXPIRESIN: string;
  APP_BUCKET: AppBucket;
  SCHEDULED_EMAIL_SQS: ScheduledEmailSQS;
  SERVERLESS: Serverless;
  AUTH_ISSUER_SERVER: string;
  VERIFICATION_URI: string;
}

export interface RsaSecret {
  Secret: string;
  key: string;
  rsaAlgType: string;
  type: string;
}

export interface AppBucket {
  bucket: string;
  access_key_id: string;
  secret_access_key: string;
  region: string;
  bucketUrl: string;
}
export interface ScheduledEmailSQS {
  access_key_id: string;
  secret_access_key: string;
  version: string;
  region: string;
  accountId: number;
  url: string;
  queueName: string;
}
export interface Serverless {
  access_key_id: string;
  secret_access_key: string;
}
export interface SqsConfig {
  version: string;
  region: string;
  accountId: number;
  url: string;
  queueName: string;
}
