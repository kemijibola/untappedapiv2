import { AppConfig } from '../../interfaces/AppConfig';
import { Resource } from './Resource';

export interface AppConfigParams {
  Bucket: string;
  Key: string;
}

export class AppConfigSettings implements Resource {
  private configParams: AppConfigParams = { Bucket: '', Key: '' };
  private appConfig: AppConfig = {
    PORT: 0,
    RSA_PUBLIC_KEY: '',
    DATABASE_HOST: '',
    DATABASE_NAME: '',
    DATABASE_PASSWORD: '',
    DATABASE_USER: '',
    REDIS_HOST: '',
    REDIS_PORT: 0,
    RSA_PRIVATE_KEY: '',
    RSA_KEYID: '',
    RSA_TYPE: ''
  };
  private port: number = 0;

  getObject<AppConfigParams, AppConfig>(
    params: AppConfigParams,
    s3: AWS.S3
  ): AppConfig {
    this.configParams = Object.assign(this.configParams, params);
    s3.getObject(this.configParams, async (err, data: any) => {
      if (err) {
        // do nothing
      } else {
        data = JSON.parse(data.Body.toString());
        console.log(3);
        for (const i in data) {
          process.env[i] = data[i];
        }
        console.log(2);
        console.log('42', process.env.PORT);
      }
    });

    return {} as AppConfig;
  }

  putObject<AppConfigParams, AppConfig>(
    objectParams: AppConfigParams,
    s3: AWS.S3
  ): AppConfig {
    return {} as AppConfig;
  }
}
