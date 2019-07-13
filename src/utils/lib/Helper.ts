import { AppConfig } from '../../app/models/interfaces/custom/AppConfig';
import { IRole, IPermission } from '../../app/models/interfaces';
const config: AppConfig = require('../../config/keys');
import ResourceRepository from '../../app/repository/ResourceRepository';
import ResourcePermissionRepository = require('../../app/repository/ResourcePermissionRepository');
import { Result } from '../Result';
import { PlatformError } from '../error';

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
  const resourceRepository = new ResourceRepository();
  const resourcePermissionRepository = new ResourcePermissionRepository();
  const resourceModel = await resourceRepository.findByCriteria({
    name: exchangeParams.destinationUrl
  });
  if (!resourceModel._id)
    throw PlatformError.error({
      code: 404,
      message: `${exchangeParams.destinationUrl} is not a valid route`
    });
  for (let role of exchangeParams.roles) {
    const resourcePermissionModel = await resourcePermissionRepository.findPermissionsByRole(
      role,
      resourceModel._id
    );
    if (resourcePermissionModel.permissions.length < 1)
      throw PlatformError.error({
        code: 404,
        message: `There are no permissions configured for route ${
          resourceModel.name
        }`
      });
    chunckPermission(resourcePermissionModel.permissions);
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
