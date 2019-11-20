import PermissionRepository from '../repository/PermissionRepository';
import RoleRepository from '../repository/RoleRepository';
import IPermissionBusiness = require('./interfaces/PermissionBusiness');
import { IPermission } from '../models/interfaces';
import { Result } from '../../utils/Result';
import { validateObjectId } from '../../utils/lib';

class PermissionBusiness implements IPermissionBusiness {
  private _permissionRepository: PermissionRepository;
  private _roleRepository: RoleRepository;

  constructor() {
    this._permissionRepository = new PermissionRepository();
    this._roleRepository = new RoleRepository();
  }

  async fetch(condition: any): Promise<Result<IPermission[]>> {
    try {
      const permissions = await this._permissionRepository.fetch(condition);
      return Result.ok<IPermission[]>(200, permissions);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IPermission>> {
    try {
      if (!id) return Result.fail<IPermission>(400, 'Bad request');
      const permission = await this._permissionRepository.findById(id);
      if (!permission)
        return Result.fail<IPermission>(
          404,
          `Permission of Id ${id} not found`
        );
      else return Result.ok<IPermission>(200, permission);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IPermission>> {
    try {
      if (!condition) return Result.fail<IPermission>(400, 'Bad request');
      const permission = await this._permissionRepository.findByOne(condition);
      if (!permission)
        return Result.fail<IPermission>(404, `Permission not found`);
      else return Result.ok<IPermission>(200, permission);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IPermission>> {
    try {
      const permission = await this._permissionRepository.findByCriteria(
        criteria
      );
      if (!permission)
        return Result.fail<IPermission>(404, `Permission not found`);
      else return Result.ok<IPermission>(200, permission);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IPermission): Promise<Result<IPermission>> {
    try {
      const permission = await this._permissionRepository.findByCriteria({
        name: item.name
      });
      if (permission === null) {
        const isRoleValid = validateObjectId(item.role);
        if (!isRoleValid) {
          return Result.fail<IPermission>(400, 'Role is invalid');
        }
        const role = await this._roleRepository.findById(item.role);
        if (role === null) {
          return Result.fail<IPermission>(400, 'Role not found');
        }
        const newPermission = await this._permissionRepository.create(item);
        return Result.ok<IPermission>(201, newPermission);
      }
      return Result.fail<IPermission>(
        400,
        `Permission with name '${permission.name}' already exist.`
      );
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IPermission): Promise<Result<IPermission>> {
    try {
      const permission = await this._permissionRepository.findById(id);
      if (!permission)
        return Result.fail<IPermission>(
          404,
          `Could not update permission.Permission with Id ${id} not found`
        );
      const updateObj = await this._permissionRepository.update(
        permission._id,
        item
      );
      return Result.ok<IPermission>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._permissionRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(PermissionBusiness);
export = PermissionBusiness;
