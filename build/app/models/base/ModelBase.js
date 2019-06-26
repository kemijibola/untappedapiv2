"use strict";
class ModelBase {
    constructor(timeStampModel) {
        this._timeStampModel = timeStampModel;
    }
    get createAt() {
        return this._timeStampModel.createdAt;
    }
    get updatedAt() {
        return this._timeStampModel.updateAt || new Date();
    }
}
Object.seal(ModelBase);
module.exports = ModelBase;
