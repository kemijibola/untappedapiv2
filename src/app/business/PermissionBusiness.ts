import PermissionRepository from "../repository/PermissionRepository";
import RoleRepository from "../repository/RoleRepository";
import IPermissionBusiness = require("./interfaces/PermissionBusiness");
import { IPermission } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { validateObjectId } from "../../utils/lib";

class PermissionBusiness implements IPermissionBusiness {
  private _permissionRepository: PermissionRepository;
  private _roleRepository: RoleRepository;

  constructor() {
    this._permissionRepository = new PermissionRepository();
    this._roleRepository = new RoleRepository();
  }

  async fetch(condition: any): Promise<Result<IPermission[]>> {
    const permissions = await this._permissionRepository.fetch(condition);
    return Result.ok<IPermission[]>(200, permissions);
  }

  async findById(id: string): Promise<Result<IPermission>> {
    if (!id) return Result.fail<IPermission>(400, "Bad request");
    const permission = await this._permissionRepository.findById(id);
    if (!permission)
      return Result.fail<IPermission>(404, `Permission of Id ${id} not found`);
    return Result.ok<IPermission>(200, permission);
  }

  async findOne(condition: any): Promise<Result<IPermission>> {
    if (!condition) return Result.fail<IPermission>(400, "Bad request");
    const permission = await this._permissionRepository.findByOne(condition);
    if (!permission)
      return Result.fail<IPermission>(404, `Permission not found`);
    return Result.ok<IPermission>(200, permission);
  }

  async findByCriteria(criteria: any): Promise<Result<IPermission>> {
    const permission = await this._permissionRepository.findByCriteria(
      criteria
    );
    if (!permission)
      return Result.fail<IPermission>(404, `Permission not found`);
    return Result.ok<IPermission>(200, permission);
  }

  async create(item: IPermission): Promise<Result<IPermission>> {
    console.log("here");
    const permission = await this._permissionRepository.findByCriteria({
      name: item.name
    });
    if (permission === null) {
      item.isActive = false;
      const newPermission = await this._permissionRepository.create(item);
      return Result.ok<IPermission>(201, newPermission);
    }
    return Result.fail<IPermission>(400, `${permission.name} already exist.`);
  }

  async update(id: string, item: IPermission): Promise<Result<IPermission>> {
    const permission = await this._permissionRepository.findById(id);
    if (!permission)
      return Result.fail<IPermission>(404, "Permission not found");
    const updateObj = await this._permissionRepository.update(
      permission._id,
      item
    );
    return Result.ok<IPermission>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._permissionRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(PermissionBusiness);
export = PermissionBusiness;
