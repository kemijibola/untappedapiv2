import mongoose = require('mongoose');
import { IResource } from '../models/interfaces';
import ResourceSchema from '../data/schema/Resource';
import RepositoryBase from './base/RepositoryBase';

class ResourceRepository extends RepositoryBase<IResource> {
  private resourceModel: mongoose.Model<mongoose.Document>;
  constructor() {
    super(ResourceSchema);
    this.resourceModel = ResourceSchema;
  }

  findByName(name: string): Promise<IResource> {
    const promise = new Promise<IResource>((resolve, reject) => {
      this.resourceModel.findOne(
        { name: name },
        (error: any, result: IResource) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
    return promise;
  }
}

Object.seal(ResourceRepository);
export = ResourceRepository;
