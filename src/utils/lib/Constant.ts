import { ObjectKeyString } from './Helper';

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
