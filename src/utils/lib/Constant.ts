import { ObjectKeyString } from "./Helper";
import { AppConfig } from "../../app/models/interfaces/custom/AppConfig";
const config: AppConfig = require("../../config/keys");

export const AcceptedImageExt: ObjectKeyString = {
  png: "image",
  jpeg: "image",
  jpg: "image",
  gif: "image",
  svg: "image",
  exif: "image",
  tiff: "image",
  bmp: "image",
  ppm: "image",
  webp: "image",
  bat: "image",
  heif: "image",
  bpg: "image",
};

export const AcceptedAudioExt: ObjectKeyString = {
  mp3: "audio",
  wma: "audio",
  webm: "audio",
  wav: "audio",
  mp4: "audio",
  mpeg: "audio",
  aax: "audio",
  voc: "audio",
  mpc: "audio",
  gsm: "audio",
  pcm: "audio",
  aiff: "audio",
  aac: "audio",
  ogg: "audio",
  flac: "audio",
  alac: "audio",
};
export const AcceptedVideoExt: ObjectKeyString = {
  mp4: "video",
  mpeg: "video",
  avi: "video",
  flv: "video",
  "3gp": "video",
  ogg: "video",
  wmv: "video",
  webm: "video",
  vob: "video",
  wav: "video",
  lxf: "video",
  mkv: "video",
};

function getIssuer(): string {
  return config.ISSUER || "http://localhost:8900";
}

function getAuthExpiration(): number {
  return config.AUTH_EXPIRESIN || 43200;
}

function getMailExpiration(): number {
  return config.MAIL_EXPIRESIN || 86400;
}

export const currentAuthKey: string = "42";
export const currentVerifyKey: string = "43";
export const currentRsaAlgType: string = "RS256";
export const issuer: string = getIssuer();
export const authExpiration: number = getAuthExpiration();
export const mailExpiration: number = getMailExpiration();
export const verifyTokenExpiration: number = getMailExpiration();
