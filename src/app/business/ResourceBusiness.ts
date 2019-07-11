import ResourceRepository from '../repository/ResourceRepository';
import IResourceBusiness = require('./interfaces/ResourceBusiness');
import { IResource } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ResourceBusiness implements IResourceBusiness {
  private _resourceRepository: ResourceRepository;

  constructor() {
    this._resourceRepository = new ResourceRepository();
  }

  async fetch(): Promise<Result<IResource>> {
    try {
      const resources = await this._resourceRepository.fetch();
      return Result.ok<IResource>(200, resources);
    } catch (err) {
      return Result.fail<IResource>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<IResource>> {
    try {
      const resource = await this._resourceRepository.findById(id);
      if (!resource._id)
        return Result.fail<IResource>(404, `Resource of Id ${id} not found`);
      else return Result.ok<IResource>(200, resource);
    } catch (err) {
      return Result.fail<IResource>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IResource>> {
    try {
      const resource = await this._resourceRepository.findByCriteria(criteria);
      if (!resource._id)
        return Result.fail<IResource>(404, `Resource not found`);
      else return Result.ok<IResource>(200, resource);
    } catch (err) {
      return Result.fail<IResource>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(item: IResource): Promise<Result<IResource>> {
    try {
      const newResource = await this._resourceRepository.create(item);
      return Result.ok<IResource>(201, newResource);
    } catch (err) {
      return Result.fail<IResource>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(id: string, item: IResource): Promise<Result<IResource>> {
    try {
      const resource = await this._resourceRepository.findById(id);
      if (!resource._id)
        return Result.fail<IResource>(
          404,
          `Could not update resource.Resource of Id ${id} not found`
        );
      const updateObj = await this._resourceRepository.update(
        resource._id,
        item
      );
      return Result.ok<IResource>(200, updateObj);
    } catch (err) {
      return Result.fail<IResource>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._resourceRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(ResourceBusiness);
export = ResourceBusiness;
