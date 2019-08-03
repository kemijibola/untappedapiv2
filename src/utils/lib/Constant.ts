import { ObjectKeyString } from './Helper';
import { AppConfig } from '../../app/models/interfaces/custom/AppConfig';
const config: AppConfig = require('../../config/keys');

export const audioExtentions: string[] = [
  'mp3',
  '3gp',
  'aax',
  'wma',
  'webm',
  'wav',
  'voc',
  'mpc',
  'gsm',
  'pcm',
  'aiff',
  'aac',
  'ogg',
  'flac',
  'alac'
];
export const videoExtensions: string[] = [
  'mp4',
  '3gp',
  'ogg',
  'wmv',
  'webm',
  'flv',
  'avi',
  'vob',
  'mpeg',
  'wav',
  'lxf'
];
export const imageExtensions: string[] = [
  'jpeg',
  'exif',
  'tiff',
  'gif',
  'bmp',
  'png',
  'ppm',
  'webp',
  'svg',
  'bat',
  'heif',
  'bpg'
];

export const AcceptedMedias: ObjectKeyString = {
  png: 'image',
  jpeg: 'image',
  gif: 'image',
  svg: 'image',
  mp4: 'audio',
  mpeg: 'video',
  avi: 'video',
  flv: 'video',
  mp3: 'audio',
  wma: 'audio',
  '3gp': 'video'
};

function getCurrentKey(): string {
  let key = '';
  const keySearch = config.RSA_PRIVATE.filter(x => x.key === '42')[0];
  if (keySearch) {
    key = keySearch.key;
  }
  return key;
}

function getCurrentRsa(): string {
  let rsa = '';
  const rsaSearch = config.RSA_PRIVATE.filter(x => x.rsaAlgType === 'RS256')[0];
  if (rsaSearch) {
    rsa = rsaSearch.rsaAlgType;
  }
  return rsa;
}

function getIssuer(): string {
  return config.ISSUER.toLowerCase() || '';
}

function getAuthExpiration(): string {
  return config.AUTH_EXPIRESIN || '';
}

function getMailExpiration(): string {
  return config.MAIL_EXPIRESIN || '';
}

export const currentKey: string = getCurrentKey();
export const rsaAlgType: string = getCurrentRsa();
export const issuer: string = getIssuer();
export const authExpiration: string = getAuthExpiration();
export const mailExpiration: string = getMailExpiration();
