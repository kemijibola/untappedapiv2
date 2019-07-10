import PermissionRepository from '../repository/PermissionRepository';
import IPermissionBusiness = require('./interfaces/PermissionBusiness');
import { IPermission } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class PermissionBusiness implements IPermissionBusiness {
  private _permissionRepository: PermissionRepository;

  constructor() {
    this._permissionRepository = new PermissionRepository();
  }

  fetch(): Promise<IPermission> {
    return this._permissionRepository.fetch();
  }

  findById(id: string): Promise<IPermission> {
    return this._permissionRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IPermission> {
    return this.findByCriteria(criteria);
  }

  create(item: IPermission): Promise<IPermission> {
    return this._permissionRepository.create(item);
  }

  async update(id: string, item: IPermission): Promise<IPermission> {
    const permissionModel = await this._permissionRepository.findById(id);
    if (!permissionModel)
      throw new RecordNotFound(`Permission with id: ${id} not found`, 404);
    return this._permissionRepository.update(permissionModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._permissionRepository.delete(id);
  }
}

Object.seal(PermissionBusiness);
export = PermissionBusiness;
