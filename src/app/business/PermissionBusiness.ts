import PermissionRepository from '../repository/PermissionRepository';
import IPermissionBusiness = require('./interfaces/PermissionBusiness');
import { IPermission } from '../models/interfaces';
import { Result } from '../../utils/Result';

class PermissionBusiness implements IPermissionBusiness {
  private _permissionRepository: PermissionRepository;

  constructor() {
    this._permissionRepository = new PermissionRepository();
  }

  async fetch(): Promise<Result<IPermission>> {
    try {
      const permissions = await this._permissionRepository.fetch();
      return Result.ok<IPermission>(200, permissions);
    } catch (err) {
      return Result.fail<IPermission>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<IPermission>> {
    try {
      const permission = await this._permissionRepository.findById(id);
      if (!permission._id)
        return Result.fail<IPermission>(
          404,
          `Permission of Id ${id} not found`
        );
      else return Result.ok<IPermission>(200, permission);
    } catch (err) {
      return Result.fail<IPermission>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IPermission>> {
    try {
      const permission = await this._permissionRepository.findByCriteria(
        criteria
      );
      if (!permission._id)
        return Result.fail<IPermission>(404, `Permission not found`);
      else return Result.ok<IPermission>(200, permission);
    } catch (err) {
      return Result.fail<IPermission>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(item: IPermission): Promise<Result<IPermission>> {
    try {
      const newPermission = await this._permissionRepository.create(item);
      return Result.ok<IPermission>(201, newPermission);
    } catch (err) {
      return Result.fail<IPermission>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(id: string, item: IPermission): Promise<Result<IPermission>> {
    try {
      const permission = await this._permissionRepository.findById(id);
      if (!permission._id)
        return Result.fail<IPermission>(
          404,
          `Could not update permission.Permission of Id ${id} not found`
        );
      const updateObj = await this._permissionRepository.update(
        permission._id,
        item
      );
      return Result.ok<IPermission>(200, updateObj);
    } catch (err) {
      return Result.fail<IPermission>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._permissionRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(PermissionBusiness);
export = PermissionBusiness;
