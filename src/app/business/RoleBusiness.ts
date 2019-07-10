import RoleRepository from '../repository/RoleRepository';
import IRoleBusiness = require('./interfaces/RoleBusiness');
import { IRole } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class RoleBusiness implements IRoleBusiness {
  private _roleRepository: RoleRepository;

  constructor() {
    this._roleRepository = new RoleRepository();
  }

  fetch(): Promise<IRole> {
    return this._roleRepository.fetch();
  }

  findById(id: string): Promise<IRole> {
    return this._roleRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IRole> {
    return this.findByCriteria(criteria);
  }

  create(item: IRole): Promise<IRole> {
    return this._roleRepository.create(item);
  }

  async update(id: string, item: IRole): Promise<IRole> {
    const roleModel = await this._roleRepository.findById(id);
    if (!roleModel)
      throw new RecordNotFound(`Role with id: ${id} not found`, 404);
    return this._roleRepository.update(roleModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._roleRepository.delete(id);
  }
}

Object.seal(RoleBusiness);
export = RoleBusiness;
