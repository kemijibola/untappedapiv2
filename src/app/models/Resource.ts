import { IResource } from './interfaces';

class ResourceModel {
  private _resourceModel: IResource;
  constructor(resourceModel: IResource) {
    this._resourceModel = resourceModel;
  }

  get name(): string {
    return this._resourceModel.name;
  }
}

Object.seal(ResourceModel);
export = ResourceModel;
