import ResourceRepository from '../repository/ResourceRepository';
import IResourceBusiness = require('./interfaces/ResourceBusiness');
import { IResource } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class ResourceBusiness implements IResourceBusiness {
  private _resourceRepository: ResourceRepository;

  constructor() {
    this._resourceRepository = new ResourceRepository();
  }

  fetch(): Promise<IResource> {
    return this._resourceRepository.fetch();
  }

  findById(id: string): Promise<IResource> {
    return this._resourceRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IResource> {
    return this.findByCriteria(criteria);
  }

  create(item: IResource): Promise<IResource> {
    return this._resourceRepository.create(item);
  }

  async update(id: string, item: IResource): Promise<IResource> {
    const resourceModel = await this._resourceRepository.findById(id);
    if (!resourceModel)
      throw new RecordNotFound(`Resource with id: ${id} not found`, 404);
    return this._resourceRepository.update(resourceModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._resourceRepository.delete(id);
  }
}

Object.seal(ResourceBusiness);
export = ResourceBusiness;
