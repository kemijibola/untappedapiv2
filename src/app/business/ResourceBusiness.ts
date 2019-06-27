import ResourceRepository from '../repository/ResourceRepository';
import IResourceBusiness from './interface/ResourceBusiness';
import { IResource } from '../models/interfaces';

class ResourceBusiness implements IResourceBusiness {
  private _resourceRepository: ResourceRepository;

  constructor() {
    this._resourceRepository = new ResourceRepository();
  }

  create(item: IResource, callback: (error: any, result: any) => void) {
    this._resourceRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._resourceRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IResource,
    callback: (error: any, result: any) => void
  ) {
    this._resourceRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._resourceRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._resourceRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IResource) => void) {
    this._resourceRepository.findById(_id, callback);
  }
}
Object.seal(ResourceBusiness);
export = ResourceBusiness;
