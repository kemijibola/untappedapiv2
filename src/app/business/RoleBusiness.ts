import RoleRepository from '../repository/RoleRepository';
import IRoleBusiness = require('./interfaces/RoleBusiness');
import { IRole } from '../models/interfaces';
import { Result } from '../../utils/Result';
import { RoleViewModel } from '../models/viewmodels';

class RoleBusiness implements IRoleBusiness {
  private _roleRepository: RoleRepository;

  constructor() {
    this._roleRepository = new RoleRepository();
  }

  async fetch(condition: any): Promise<Result<any[]>> {
    try {
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
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IRole>> {
    try {
      if (!id) return Result.fail<IRole>(400, 'Bad request');
      const role = await this._roleRepository.findById(id);
      if (!role) return Result.fail<IRole>(404, `Role of Id ${id} not found`);
      else return Result.ok<IRole>(200, role);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IRole>> {
    try {
      if (!condition) return Result.fail<IRole>(400, 'Bad request');
      const role = await this._roleRepository.findByOne(condition);
      if (!role) return Result.fail<IRole>(404, `Role not found`);
      else return Result.ok<IRole>(200, role);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IRole>> {
    try {
      const role = await this._roleRepository.findByCriteria(criteria);
      if (!role) return Result.fail<IRole>(404, `Role not found`);
      else return Result.ok<IRole>(200, role);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IRole): Promise<Result<IRole>> {
    try {
      const role = await this._roleRepository.findByCriteria({
        name: item.name
      });
      if (role === null) {
        const newRole = await this._roleRepository.create(item);
        // TODO:: create approval request here
        return Result.ok<IRole>(201, newRole);
      }
      return Result.fail<IRole>(400, `Role with name ${role.name} exists`);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IRole): Promise<Result<IRole>> {
    try {
      const role = await this._roleRepository.findById(id);
      if (!role)
        return Result.fail<IRole>(
          500,
          `Could not update role.Role with Id ${id} not found`
        );
      const updateObj = await this._roleRepository.update(role._id, item);
      return Result.ok<IRole>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._roleRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(RoleBusiness);
export = RoleBusiness;
