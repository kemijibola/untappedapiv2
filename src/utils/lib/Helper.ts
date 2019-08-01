import { AppConfig } from '../../app/models/interfaces/custom/AppConfig';
import {
  IPermission,
  IApplication,
  IResource,
  IResourcePermission
} from '../../app/models/interfaces';
const config: AppConfig = require('../../config/keys');
import ResourceBusiness from '../../app/business/ResourceBusiness';
import ResourcePermissionBusiness from '../../app/business/ResourcePermissionBusiness';
import ApplicationBusiness from '../../app/business/ApplicationBusiness';
import { PlatformError } from '../error';
import mongoose from 'mongoose';
import { Result } from '../Result';
import { WelcomeEmail } from '../emailtemplates';

export type ObjectKeyString = { [x: string]: string };

export interface IExchangeToken {
  destinationUrl: string;
  roles: string[];
}

let chunkedUserPermissons: ObjectKeyString = {};

export const getPrivateKey: (keyId: string) => string = (
  keyId: string
): string => {
  return config.RSA_PRIVATE_KEYS[keyId].replace(/\\n/g, '\n');
};

export async function tokenExchange(
  exchangeParams: IExchangeToken
): Promise<{ [x: string]: string }> {
  const resourceBusiness = new ResourceBusiness();
  const resourcePermissionBusiness = new ResourcePermissionBusiness();
  const resourceResult = await resourceBusiness.findByCriteria({
    name: exchangeParams.destinationUrl
  });
  if (!resourceResult.data) {
    throw PlatformError.error({
      code: resourceResult.responseCode,
      message: `${exchangeParams.destinationUrl} is not a valid route`
    });
  }
  const resource: IResource = resourceResult.data;

  for (let role of exchangeParams.roles) {
    const resourcePermissionResult = await resourcePermissionBusiness.findByCriteria(
      {
        role: role,
        resource: resource._id
      }
    );
    if (!resourcePermissionResult.data) {
      throw PlatformError.error({
        code: resourceResult.responseCode,
        message: `There are no permissions configured for route ${
          resource.name
        }`
      });
    }
    const resourcePermission: IResourcePermission =
      resourcePermissionResult.data;
    chunckPermission(resourcePermission.permissions);
  }
  return chunkedUserPermissons;
}

function chunckPermission(permissions: IPermission[]): void {
  for (let item of permissions) {
    if (!chunkedUserPermissons[item.name]) {
      chunkedUserPermissons[item.name] = item.name;
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
