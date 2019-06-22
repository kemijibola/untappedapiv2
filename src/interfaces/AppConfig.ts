export interface AppConfig {
  PORT: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  RSA_PUBLIC_KEY: string;
  RSA_PRIVATE_KEY: string;
  RSA_KEYID: string;
  RSA_TYPE: string;
  DATABASE_HOST: string;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
}
