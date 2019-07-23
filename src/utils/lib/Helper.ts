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

export interface IExchangeToken {
  destinationUrl: string;
  roles: string[];
}

let chunkedUserPermissons: { [x: string]: string } = {};

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
