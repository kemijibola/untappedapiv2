import { AppConfig } from "../../app/models/interfaces/custom/AppConfig";
import { IPermission, IApplication, IMedia } from "../../app/models/interfaces";
const config: AppConfig = require("../../config/keys");
import ResourceBusiness from "../../app/business/RolePermissionBusiness";
import PermissionBusiness from "../../app/business/PermissionBusiness";
import ApplicationBusiness from "../../app/business/ApplicationBusiness";
import { PlatformError } from "../error";
import { Result } from "../Result";
import * as mongoose from "mongoose";
import { AES, enc, mode, pad } from "crypto-js";
import { createHmac } from "crypto";

export type ObjectKeyString = { [x: string]: string };

export interface IExchangeToken {
  destinationUrl: string;
  roles: string[];
}

let chunkedUserPermissons: ObjectKeyString = {};

export const getSecretByKey: (keyId: string) => string = (
  keyId: string
): string => {
  const secret = config.RSA_PRIVATE.filter((x) => x.key === keyId)[0];
  if (!secret) {
    return "";
  }
  return secret.Secret.replace(/\\n/g, "\n");
};

export const validateObjectId: (id: string) => boolean = (
  id: string
): boolean => {
  var hexReg = new RegExp("^[0-9a-fA-F]{24}$");
  return hexReg.test(id);
};
export const getPublicKey: (keyId: string) => string = (
  keyId: string
): string => {
  const secret = config.RSA_PUBLIC.filter((x) => x.key === keyId)[0];
  if (!secret) {
    return "";
  }
  return secret.Secret.replace(/\\n/g, "\n");
};

export async function isValidIdentity(
  audience: string
): Promise<Result<boolean>> {
  try {
    const applicationBusiness = new ApplicationBusiness();
    const app = await applicationBusiness.findByCriteria({
      identity: audience,
    });
    if (!app)
      return Result.fail<boolean>(404, `Audience '${audience}' not found`);
    return Result.ok<boolean>(200, true);
  } catch (err) {
    throw new Error(`InternalServer error occured.${err.message}`);
  }
}

export interface IStringDate {
  year: string;
  month: string;
  date?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
}

export function dateStringToDate(dateString: IStringDate): Date {
  // const dateParts = dateString.split('/').map((value: string) => {
  //   return parseInt(value);
  // });
  const year = parseInt(dateString.year);
  const month = parseInt(dateString.month);
  let date = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (dateString.date) {
    date = parseInt(dateString.date);
  }
  if (dateString.hours) {
    hours = parseInt(dateString.hours);
  }
  if (dateString.minutes) {
    minutes = parseInt(dateString.minutes);
  }
  if (dateString.seconds) {
    seconds = parseInt(dateString.seconds);
  }
  return new Date(year, month, date, hours, minutes, seconds);
}

export function escapeJSON(json: string) {
  var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  var meta: { [x: string]: string } = {
    // table of character substitutions
    "\b": "\\b",
    "\t": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    '"': '\\"',
    "\\": "\\\\",
  };

  escapable.lastIndex = 0;
  return escapable.test(json)
    ? '"' +
        json.replace(escapable, function (a: string) {
          var c = meta[a];
          return typeof c === "string"
            ? c
            : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) +
        '"'
    : '"' + json + '"';
}

export function generateInvoiceNo(): string {
  var number = Math.floor(Math.random() * 9999) + 1;
  let numberStr = "";
  if (number.toString().length <= 4) {
    numberStr = String("0000" + number).slice(-4);
  }
  var dt = new Date();
  let day = dt.getDate();
  let m = dt.getMonth() + 1;
  var retVal = "UP" + "/" + day + "" + m + "/" + numberStr;
  return retVal;
}

// export function generateContestant

export function generateRandomNumber(size: number): string {
  var otp = "";
  var possible = "0123456789";
  for (var i = 0; i <= size; i++) {
    otp += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return otp;
}

export function generateAutoPassword(): string {
  var text = "";
  var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 8; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 2; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getRandomId(): string {
  var number = Math.floor(Math.random() * 99999) + 1;
  let numberStr = "";
  if (number.toString().length <= 5) {
    numberStr = String("00000" + number).slice(-5);
  }
  var retVal = makeid() + "-" + numberStr;
  return retVal;
}

export function toObjectId(_id: string): mongoose.Types.ObjectId {
  return mongoose.Types.ObjectId.createFromHexString(_id);
}

export function getTime(date?: Date) {
  return date != null ? new Date(date).getTime() : 0;
}

export function isUnique(arr: any): boolean {
  let seenValues: any = {};

  for (let i = 0; i < arr.length; i++) {
    if (seenValues[arr[i]]) {
      return false;
    } else {
      seenValues[arr[i]] = true;
    }
  }
  return true;
}

export function encrypt(keys: any, value: any): string {
  var key = enc.Utf8.parse(keys);
  var iv = enc.Utf8.parse(keys);
  var encrypted = AES.encrypt(enc.Utf8.parse(value.toString()), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
  return encrypted.toString();
}

export function decrypt(keys: any, value: any): string {
  var key = enc.Utf8.parse(keys);
  var iv = enc.Utf8.parse(keys);
  var decrypted = AES.decrypt(value, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
  return decrypted.toString(enc.Utf8);
}

export function signatureHash(secret: string, data: string): string {
  return createHmac("sha512", secret).update(data).digest("hex");
}
