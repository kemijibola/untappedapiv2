import RolePermissionRepository from "../repository/RolePermissionRepository";
import RoleRepository from "../repository/RoleRepository";
import PermissionRepository from "../repository/PermissionRepository";
import UserTypeRepository from "../repository/UserTypeRepository";
import IRolePermissionBusiness = require("./interfaces/RolePermissionBusiness");
import { IRolePermission } from "../models/interfaces";
import { Result } from "../../utils/Result";

class RolePermissionBusiness implements IRolePermissionBusiness {
  private _rolePermissionRepository: RolePermissionRepository;
  private _roleRepository: RoleRepository;
  private _permissionRepository: PermissionRepository;
  private _userTypeRepository: UserTypeRepository;

  constructor() {
    this._rolePermissionRepository = new RolePermissionRepository();
    this._roleRepository = new RoleRepository();
    this._permissionRepository = new PermissionRepository();
    this._userTypeRepository = new UserTypeRepository();
  }

  async fetch(condition: any): Promise<Result<IRolePermission[]>> {
    const rolePermissions = await this._rolePermissionRepository.fetch(
      condition
    );
    return Result.ok<IRolePermission[]>(200, rolePermissions);
  }

  async fetchWithPermission(
    condition: any
  ): Promise<Result<IRolePermission[]>> {
    const rolePermissions = await this._rolePermissionRepository.populateFetch(
      "permission",
      condition
    );
    return Result.ok<IRolePermission[]>(200, rolePermissions);
  }

  async findById(id: string): Promise<Result<IRolePermission>> {
    if (!id) return Result.fail<IRolePermission>(400, "Bad request");
    const rolePermission = await this._rolePermissionRepository.findById(id);
    if (!rolePermission)
      return Result.fail<IRolePermission>(404, "Role permission not found");
    return Result.ok<IRolePermission>(200, rolePermission);
  }

  async findOne(condition: any): Promise<Result<IRolePermission>> {
    if (!condition) return Result.fail<IRolePermission>(400, "Bad request");
    const rolePermission = await this._rolePermissionRepository.findByOne(
      condition
    );
    if (!rolePermission)
      return Result.fail<IRolePermission>(404, "Role permission not found");
    return Result.ok<IRolePermission>(200, rolePermission);
  }

  async findByCriteria(criteria: any): Promise<Result<IRolePermission>> {
    const rolePermission = await this._rolePermissionRepository.findByCriteria(
      criteria
    );
    if (!rolePermission)
      return Result.fail<IRolePermission>(404, `Resource not found`);
    return Result.ok<IRolePermission>(200, rolePermission);
  }

  async create(item: IRolePermission): Promise<Result<IRolePermission>> {
    const role = await this._roleRepository.findById(item.role);
    if (!role) {
      return Result.fail<IRolePermission>(400, "Role not found");
    }
    if (!role.isActive) {
      return Result.fail<IRolePermission>(
        400,
        "Role has not been activated for use"
      );
    }

    const permission = await this._permissionRepository.findById(
      item.permission
    );
    if (!permission) {
      return Result.fail<IRolePermission>(400, "Permission not found");
    }

    if (!permission.isActive) {
      return Result.fail<IRolePermission>(
        400,
        "Permission has not been activated for use"
      );
    }

    const userType = await this._userTypeRepository.findById(item.userType);
    if (!userType)
      return Result.fail<IRolePermission>(400, "UserType not found");

    const rolePermission = await this._rolePermissionRepository.findByCriteria({
      role: item.role,
      permission: item.permission,
      userType: item.userType,
    });

    if (rolePermission === null) {
      const newRolePermission = await this._rolePermissionRepository.create(
        item
      );
      return Result.ok<IRolePermission>(201, newRolePermission);
    }
    return Result.fail<IRolePermission>(
      409,
      "Role has already been mapped to permission"
    );
  }

  async update(
    id: string,
    item: IRolePermission
  ): Promise<Result<IRolePermission>> {
    const rolePermission = await this._rolePermissionRepository.findById(id);
    if (!rolePermission)
      return Result.fail<IRolePermission>(404, "Role permission not found");
    const updateObj = await this._rolePermissionRepository.update(
      rolePermission._id,
      item
    );
    return Result.ok<IRolePermission>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._rolePermissionRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(RolePermissionBusiness);
export = RolePermissionBusiness;
