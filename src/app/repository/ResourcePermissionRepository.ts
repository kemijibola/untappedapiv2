import mongoose = require('mongoose');
import { IResourcePermission } from '../models/interfaces';
import { ResourcePermissionSchema } from '../data/schema/ResourcePermission';
import RepositoryBase from './base/RepositoryBase';

class ResourcePermissionRepository extends RepositoryBase<IResourcePermission> {
  private resourcePermissionModel: mongoose.Model<mongoose.Document>;
  constructor() {
    super(ResourcePermissionSchema);
    this.resourcePermissionModel = ResourcePermissionSchema;
  }

  findPermissionsByRole(
    role: string,
    resource: string
  ): Promise<IResourcePermission> {
    return new Promise<IResourcePermission>((resolve, reject) => {
      this.resourcePermissionModel
        .findOne(
          {
            role: role,
            resource: resource
          },
          'permissions',
          (error: any, result: IResourcePermission) => {
            console.log(error);
            if (error) reject(error);
            else resolve(result);
          }
        )
        .populate('permissions');
    });
  }
}

Object.seal(ResourcePermissionRepository);
export = ResourcePermissionRepository;
