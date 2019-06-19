import { S3Params } from './S3';

export interface AppConfig {
  bucket: S3Params;
  rsaPublicKey?: string;
  port?: string;
  databaseName?: string;
  databaseUser?: string;
  databasePassword?: string;
  redisHost?: string;
  redisPort?: string;
  rsaPrivateKey?: string;
  rsaType?: string;
  rsaKid?: string;
}
