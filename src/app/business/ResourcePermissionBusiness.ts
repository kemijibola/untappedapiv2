import ResourcePermissionRepository from '../repository/ResourcePermissionRepository';
import ResourceRepository from '../repository/ResourceRepository';
import RoleRepository from '../repository/RoleRepository';
import PermissionRepository from '../repository/PermissionRepository';
import IResourcePermissionBusiness = require('./interfaces/ResourcePermissionBusiness');
import { IResourcePermission, IPermission } from '../models/interfaces';
import { Result } from '../../utils/Result';
import { StringListMerger } from '../../utils/lib/StringMerger';

class ResourcePermissionBusiness implements IResourcePermissionBusiness {
  private _resourcePermissionRepository: ResourcePermissionRepository;
  private _resourceRepository: ResourceRepository;
  private _roleRepository: RoleRepository;
  private _permissionRepository: PermissionRepository;

  constructor() {
    this._resourcePermissionRepository = new ResourcePermissionRepository();
    this._resourceRepository = new ResourceRepository();
    this._roleRepository = new RoleRepository();
    this._permissionRepository = new PermissionRepository();
  }

  async fetch(): Promise<Result<IResourcePermission>> {
    try {
      const resourcePermissions = await this._resourcePermissionRepository.fetch();
      return Result.ok<IResourcePermission>(200, resourcePermissions);
    } catch (err) {
      return Result.fail<IResourcePermission>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<IResourcePermission>> {
    try {
      const resourcePermission = await this._resourcePermissionRepository.findById(
        id
      );
      if (!resourcePermission)
        return Result.fail<IResourcePermission>(
          404,
          `Resource permission of Id ${id} not found`
        );
      else return Result.ok<IResourcePermission>(200, resourcePermission);
    } catch (err) {
      return Result.fail<IResourcePermission>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IResourcePermission>> {
    try {
      const resourcePermission = await this._resourcePermissionRepository.findByCriteria(
        criteria
      );
      if (!resourcePermission)
        return Result.fail<IResourcePermission>(
          404,
          `Resource permission not found`
        );
      else return Result.ok<IResourcePermission>(200, resourcePermission);
    } catch (err) {
      return Result.fail<IResourcePermission>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(
    item: IResourcePermission
  ): Promise<Result<IResourcePermission>> {
    try {
      // check if resource is a valid resource
      const resource = await this._resourceRepository.findById(item.resource);
      if (!resource)
        return Result.fail<IResourcePermission>(
          400,
          `Resource id ${item.resource} is not a valid resource`
        );
      // check if role is a valid role
      const role = await this._roleRepository.findById(item.role);
      if (!role)
        return Result.fail<IResourcePermission>(
          400,
          `Role id ${item.role} is not a valid role`
        );
      // check if the permissions sent are valid permissions
      for (let key of item.permissions) {
        const permission = await this._permissionRepository.findById(key);
        if (!permission)
          return Result.fail<IResourcePermission>(
            400,
            `Permission id ${key} is not a valid Permission`
          );
      }

      // Before saving resource permission, ensure resource and role is not duplicated
      let resourcePermission = await this._resourcePermissionRepository.findByCriteria(
        {
          resource: resource._id,
          role: role._id
        }
      );
      // if query returns object, this means there's already configuration for resrouce
      if (resourcePermission !== null) {
        const permissionMerger = new StringListMerger(
          resourcePermission.permissions,
          item.permissions
        );
        resourcePermission.permissions = permissionMerger.mergeList();
        await resourcePermission.save();
        return Result.ok<IResourcePermission>(200, resourcePermission);
      }
      const newResourcePermission = await this._resourcePermissionRepository.create(
        item
      );
      return Result.ok<IResourcePermission>(201, newResourcePermission);
    } catch (err) {
      return Result.fail<IResourcePermission>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(
    id: string,
    item: IResourcePermission
  ): Promise<Result<IResourcePermission>> {
    try {
      const resourcePermission = await this._resourcePermissionRepository.findById(
        id
      );
      if (!resourcePermission._id)
        return Result.fail<IResourcePermission>(
          404,
          `Could not update resource permission.Resource permission of Id ${id} not found`
        );
      const updateObj = await this._resourcePermissionRepository.update(
        resourcePermission._id,
        item
      );
      return Result.ok<IResourcePermission>(200, updateObj);
    } catch (err) {
      return Result.fail<IResourcePermission>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._resourcePermissionRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(ResourcePermissionBusiness);
export = ResourcePermissionBusiness;
