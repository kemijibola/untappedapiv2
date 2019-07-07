export interface SecretKey {
  KID: string;
  SECRET: string;
}

export interface AppConfig {
  PORT: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  RSA_PUBLIC_KEYS: { [x: string]: string };
  RSA_PRIVATE_KEYS: { [x: string]: string };
  RSA_KEYID: string;
  RSA_ALG_TYPE: string;
  DATABASE_HOST: string;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  ISSUER: string;
  AUTH_EXPIRESIN: string;
  MAIL_EXPIRESIN: string;
}
