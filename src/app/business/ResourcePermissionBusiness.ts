import ResourcePermissionRepository from '../repository/ResourcePermissionRepository';
import ResourceRepository from '../repository/ResourceRepository';
import RoleRepository from '../repository/RoleRepository';
import PermissionRepository from '../repository/PermissionRepository';
import IResourcePermissionBusiness = require('./interfaces/ResourcePermissionBusiness');
import { IResourcePermission, IPermission } from '../models/interfaces';
import { Result } from '../../utils/Result';
import { StringListMerger } from '../../utils/lib/StringMerger';
import { toObjectId } from '../../utils/lib';

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

  async fetch(condition: any): Promise<Result<IResourcePermission[]>> {
    try {
      const resourcePermissions = await this._resourcePermissionRepository.fetch(
        condition
      );
      return Result.ok<IResourcePermission[]>(200, resourcePermissions);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IResourcePermission>> {
    try {
      if (!id) return Result.fail<IResourcePermission>(400, 'Bad request');
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
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IResourcePermission>> {
    try {
      if (!condition)
        return Result.fail<IResourcePermission>(400, 'Bad request');
      const resourcePermission = await this._resourcePermissionRepository.findByOne(
        condition
      );
      if (!resourcePermission)
        return Result.fail<IResourcePermission>(
          404,
          `Resource permission not found`
        );
      else return Result.ok<IResourcePermission>(200, resourcePermission);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
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
      throw new Error(`InternalServer error occured.${err.message}`);
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
      let permissionIds = [];
      // check if the permissions sent are valid permissions
      for (let key of item.permissions) {
        const permission = await this._permissionRepository.findById(key);
        if (!permission)
          return Result.fail<IResourcePermission>(
            400,
            `Permission id ${key} is not a valid Permission`
          );
        permissionIds.push(toObjectId(key));
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
        resourcePermission.permissions = [...permissionIds];
        await resourcePermission.save();
        return Result.ok<IResourcePermission>(200, resourcePermission);
      }
      const newResourcePermission = await this._resourcePermissionRepository.create(
        item
      );
      return Result.ok<IResourcePermission>(201, newResourcePermission);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
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
          `Could not update resource permission.Resource permission with Id ${id} not found`
        );
      const updateObj = await this._resourcePermissionRepository.update(
        resourcePermission._id,
        item
      );
      return Result.ok<IResourcePermission>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._resourcePermissionRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(ResourcePermissionBusiness);
export = ResourcePermissionBusiness;
