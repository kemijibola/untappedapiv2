import RoleRepository from "../repository/RoleRepository";
import IRoleBusiness = require("./interfaces/RoleBusiness");
import { IRole } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { RoleViewModel } from "../models/viewmodels";
import UserTypeRepository from "../repository/UserTypeRepository";
import { validateObjectId } from "../../utils/lib";

class RoleBusiness implements IRoleBusiness {
  private _roleRepository: RoleRepository;

  constructor() {
    this._roleRepository = new RoleRepository();
  }

  async fetch(condition: any): Promise<Result<any[]>> {
    condition.global = true;
    condition.isActive = true;
    let refinedRoles: RoleViewModel[] = [];
    const roles = await this._roleRepository.fetch(condition);
    for (let role of roles) {
      const roleViewModel: RoleViewModel = {
        _id: role._id,
        name: role.name,
        global: role.global,
        description: role.description,
        createdAt: role.createdAt,
        updatedAt: role.updateAt || new Date()
      };
      refinedRoles = [...refinedRoles, roleViewModel];
    }
    return Result.ok<RoleViewModel[]>(200, refinedRoles);
  }

  async findById(id: string): Promise<Result<IRole>> {
    if (!id) return Result.fail<IRole>(400, "Bad request");
    const role = await this._roleRepository.findById(id);
    if (!role) return Result.fail<IRole>(404, `Role of Id ${id} not found`);
    return Result.ok<IRole>(200, role);
  }

  async findOne(condition: any): Promise<Result<IRole>> {
    if (!condition) return Result.fail<IRole>(400, "Bad request");
    const role = await this._roleRepository.findByOne(condition);
    if (!role) return Result.fail<IRole>(404, `Role not found`);
    return Result.ok<IRole>(200, role);
  }

  async findByCriteria(criteria: any): Promise<Result<IRole>> {
    const role = await this._roleRepository.findByCriteria(criteria);
    if (!role) return Result.fail<IRole>(404, `Role not found`);
    return Result.ok<IRole>(200, role);
  }

  async create(item: IRole): Promise<Result<IRole>> {
    const role = await this._roleRepository.findByCriteria({
      name: item.name
    });
    if (role === null) {
      // check if any role has been set to default
      const roleExist = await this._roleRepository.findByCriteria({
        name: "Free",
        isDefault: item.isDefault,
        isActive: true
      });

      if (roleExist === null) {
        item.isActive = false;
        const newRole = await this._roleRepository.create(item);
        // TODO:: create approval request here
        return Result.ok<IRole>(201, newRole);
      }
      return Result.fail<IRole>(400, "A role is currently set as default.");
    }
    return Result.fail<IRole>(400, `Role with name '${role.name}' exists`);
  }

  async update(id: string, item: IRole): Promise<Result<IRole>> {
    const role = await this._roleRepository.findById(id);
    if (!role)
      return Result.fail<IRole>(
        500,
        `Could not update role.Role with Id ${id} not found`
      );
    const updateObj = await this._roleRepository.update(role._id, item);
    return Result.ok<IRole>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._roleRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(RoleBusiness);
export = RoleBusiness;
