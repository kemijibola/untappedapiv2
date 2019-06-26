import { IPrizeType } from './interfaces';

class PrizeTypeModel {
  private _prizeTypeModel: IPrizeType;
  constructor(prizeTypeModel: IPrizeType) {
    this._prizeTypeModel = prizeTypeModel;
  }
  get name(): string {
    return this._prizeTypeModel.name;
  }
}

Object.seal(PrizeTypeModel);
exports = PrizeTypeModel;
