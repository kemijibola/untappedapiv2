import ResourcePermissionRepository from '../repository/ResourcePermissionRepository';
import IResourcePermissionBusiness = require('./interfaces/ResourcePermissionBusiness');
import { IResourcePermission } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ResourcePermissionBusiness implements IResourcePermissionBusiness {
  private _resourcePermissionRepository: ResourcePermissionRepository;

  constructor() {
    this._resourcePermissionRepository = new ResourcePermissionRepository();
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
      if (!resourcePermission._id)
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
      if (!resourcePermission._id)
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
