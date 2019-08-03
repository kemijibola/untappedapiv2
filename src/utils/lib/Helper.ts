import { AppConfig } from '../../app/models/interfaces/custom/AppConfig';
import {
  IPermission,
  IApplication,
  IResource,
  IResourcePermission
} from '../../app/models/interfaces';
const config: AppConfig = require('../../config/keys');
import ResourceBusiness from '../../app/business/ResourceBusiness';
import PermissionBusiness from '../../app/business/PermissionBusiness';
import ResourcePermissionBusiness from '../../app/business/ResourcePermissionBusiness';
import ApplicationBusiness from '../../app/business/ApplicationBusiness';
import { PlatformError } from '../error';
import mongoose from 'mongoose';
import { Result } from '../Result';

export type ObjectKeyString = { [x: string]: string };

export interface IExchangeToken {
  destinationUrl: string;
  roles: string[];
}

let chunkedUserPermissons: ObjectKeyString = {};

export const getSecretByKey: (keyId: string) => string = (
  keyId: string
): string => {
  const secret = config.RSA_PRIVATE.filter(x => x.key === keyId)[0];
  if (!secret) {
    return '';
  }
  return secret.Secret.replace(/\\n/g, '\n');
};

export const getPublicKey: (keyId: string) => string = (
  keyId: string
): string => {
  const secret = config.RSA_PUBLIC.filter(x => x.key === keyId)[0];
  if (!secret) {
    return '';
  }
  return secret.Secret.replace(/\\n/g, '\n');
};

export async function tokenExchange(
  exchangeParams: IExchangeToken
): Promise<ObjectKeyString> {
  const resourceBusiness = new ResourceBusiness();
  const resourcePermissionBusiness = new ResourcePermissionBusiness();
  const result = await resourceBusiness.findByCriteria({
    name: exchangeParams.destinationUrl
  });
  if (result.error) {
    throw PlatformError.error({
      code: result.responseCode,
      message: result.error
    });
  }
  if (result.data) {
    const destinationResource: IResource = result.data;

    for (let role of exchangeParams.roles) {
      const result = await resourcePermissionBusiness.findByCriteria({
        role: role,
        resource: destinationResource._id
      });
      if (result.error) {
        throw PlatformError.error({
          code: result.responseCode,
          message: `There are no permissions configured for route ${
            destinationResource.name
          }`
        });
      }
      if (result.data) {
        const resourcePermission: IResourcePermission = result.data;
        if (resourcePermission.permissions) {
          await chunckPermission(resourcePermission.permissions);
        }
      }
    }
  }
  Object.seal(chunkedUserPermissons);
  return chunkedUserPermissons;
}

async function chunckPermission(permissions: string[]) {
  const permissionBusiness = new PermissionBusiness();
  for (let item of permissions) {
    const result = await permissionBusiness.findByCriteria(item);
    if (result.data)
      if (!chunkedUserPermissons[result.data.name]) {
        chunkedUserPermissons[result.data.name] = result.data.name;
      }
  }
}

export function toObjectId(_id: string): mongoose.Types.ObjectId {
  return mongoose.Types.ObjectId.createFromHexString(_id);
}

export async function isValidIdentity(
  audience: string
): Promise<Result<boolean>> {
  try {
    const applicationBusiness = new ApplicationBusiness();
    const app = await applicationBusiness.findByCriteria({
      identity: audience
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
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '\\"',
    '\\': '\\\\'
  };

  escapable.lastIndex = 0;
  return escapable.test(json)
    ? '"' +
        json.replace(escapable, function(a: string) {
          var c = meta[a];
          return typeof c === 'string'
            ? c
            : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) +
        '"'
    : '"' + json + '"';
}
