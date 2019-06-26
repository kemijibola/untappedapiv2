import { IGig, IUser } from './interfaces';

class GigModel {
  private _gigModel: IGig;
  constructor(gigModel: IGig) {
    this._gigModel = gigModel;
  }

  get sender(): IUser {
    return this._gigModel.sender;
  }
  get receiver(): IUser {
    return this._gigModel.receiver;
  }
  get note(): string {
    return this._gigModel.note;
  }
  get items(): string[] {
    return this._gigModel.items;
  }
  get deletedBySender(): boolean {
    return this._gigModel.deletedBySender;
  }
  get deletedByReciver(): boolean {
    return this._gigModel.deletedByReciver;
  }
}

Object.seal(GigModel);
exports = GigModel;
