import { ObjectKeyString } from "./Helper";
import { AppConfig } from "../../app/models/interfaces/custom/AppConfig";
const config: AppConfig = require("../../config/keys");

export const audioExtentions: string[] = [
  "mp3",
  "3gp",
  "aax",
  "wma",
  "webm",
  "wav",
  "voc",
  "mpc",
  "gsm",
  "pcm",
  "aiff",
  "aac",
  "ogg",
  "flac",
  "alac"
];
export const videoExtensions: string[] = [
  "mp4",
  "3gp",
  "ogg",
  "wmv",
  "webm",
  "flv",
  "avi",
  "vob",
  "mpeg",
  "wav",
  "lxf"
];
export const imageExtensions: string[] = [
  "jpeg",
  "jpg",
  "exif",
  "tiff",
  "gif",
  "bmp",
  "png",
  "ppm",
  "webp",
  "svg",
  "bat",
  "heif",
  "bpg"
];

export const AcceptedMedias: ObjectKeyString = {
  png: "image",
  jpeg: "image",
  jpg: "image",
  gif: "image",
  svg: "image",
  mp4: "audio",
  mpeg: "video",
  avi: "video",
  flv: "video",
  mp3: "audio",
  wma: "audio",
  "3gp": "video"
};

function getIssuer(): string {
  return config.ISSUER.toLowerCase() || "http://localhost:8900";
}

function getAuthExpiration(): string {
  return config.AUTH_EXPIRESIN || "12h";
}

function getMailExpiration(): string {
  return config.MAIL_EXPIRESIN || "2h";
}

export const currentAuthKey: string = "42";
export const currentVerifyKey: string = "43";
export const currentRsaAlgType: string = "RS256";
export const issuer: string = getIssuer();
export const authExpiration: string = getAuthExpiration();
export const mailExpiration: string = getMailExpiration();
export const verifyTokenExpiration: string = getMailExpiration();
