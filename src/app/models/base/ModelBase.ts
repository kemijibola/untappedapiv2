import { ITimeStamp } from './../interfaces';

class ModelBase {
  private _timeStampModel: ITimeStamp;
  constructor(timeStampModel: ITimeStamp) {
    this._timeStampModel = timeStampModel;
  }

  get createAt(): Date {
    return this._timeStampModel.createdAt;
  }
  get updatedAt(): Date {
    return this._timeStampModel.updateAt || new Date();
  }
}

Object.seal(ModelBase);
export = ModelBase;
