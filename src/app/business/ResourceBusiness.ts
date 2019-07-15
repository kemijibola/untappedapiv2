import ResourceRepository from '../repository/ResourceRepository';
import IResourceBusiness = require('./interfaces/ResourceBusiness');
import { IResource } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ResourceBusiness implements IResourceBusiness {
  private _resourceRepository: ResourceRepository;

  constructor() {
    this._resourceRepository = new ResourceRepository();
  }

  async fetch(condition: any): Promise<Result<IResource[]>> {
    try {
      const resources = await this._resourceRepository.fetch(condition);
      return Result.ok<IResource[]>(200, resources);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IResource>> {
    try {
      const resource = await this._resourceRepository.findById(id);
      if (!resource)
        return Result.fail<IResource>(404, `Resource of Id ${id} not found`);
      else return Result.ok<IResource>(200, resource);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IResource>> {
    try {
      const resource = await this._resourceRepository.findByCriteria(criteria);
      if (!resource) return Result.fail<IResource>(404, `Resource not found`);
      else return Result.ok<IResource>(200, resource);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IResource): Promise<Result<IResource>> {
    try {
      const resource = await this._resourceRepository.findByCriteria({
        name: item.name
      });
      if (resource === null) {
        const newResource = await this._resourceRepository.create(item);
        return Result.ok<IResource>(201, newResource);
      }
      return Result.fail<IResource>(
        400,
        `Resource with name ${resource.name} exists`
      );
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IResource): Promise<Result<IResource>> {
    try {
      const resource = await this._resourceRepository.findById(id);
      if (!resource)
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
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._resourceRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(ResourceBusiness);
export = ResourceBusiness;
