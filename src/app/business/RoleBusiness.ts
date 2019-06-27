import RoleRepository from '../repository/RoleRepository';
import IRoleBusiness from './interface/RoleBusiness';
import { IRole } from '../models/interfaces';

class RoleBusiness implements IRoleBusiness {
  private _roleRepository: RoleRepository;

  constructor() {
    this._roleRepository = new RoleRepository();
  }

  create(item: IRole, callback: (error: any, result: any) => void) {
    this._roleRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._roleRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IRole,
    callback: (error: any, result: any) => void
  ) {
    this._roleRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._roleRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._roleRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IRole) => void) {
    this._roleRepository.findById(_id, callback);
  }
}
Object.seal(RoleBusiness);
export = RoleBusiness;
