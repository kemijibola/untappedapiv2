import { AppConfig } from '../../app/models/interfaces/custom/AppConfig';
import { IRole, IPermission } from '../../app/models/interfaces';
const config: AppConfig = require('../../config/keys');
import ResourceRepository from '../../app/repository/ResourceRepository';
import ResourcePermissionRepository = require('../../app/repository/ResourcePermissionRepository');

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
  console.log(resourceModel);
  for (let role of exchangeParams.roles) {
    console.log(1);
    const resourcePermissionModel = await resourcePermissionRepository.findPermissionsByRole(
      role,
      resourceModel._id
    );
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
