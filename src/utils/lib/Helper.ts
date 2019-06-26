import { AppConfig } from '../../app/models/interfaces/custom/AppConfig';
const config: AppConfig = module.require('../config/keys');

export function getPrivateKey(keyId: string): string {
  return config.RSA_PRIVATE_KEY.filter(x => x.KID === keyId)[0].SECRET.replace(
    /\\n/g,
    '\n'
  );
}
