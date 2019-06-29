"use strict";
var ModelBase = /** @class */ (function () {
    function ModelBase(timeStampModel) {
        this._timeStampModel = timeStampModel;
    }
    Object.defineProperty(ModelBase.prototype, "createAt", {
        get: function () {
            return this._timeStampModel.createdAt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelBase.prototype, "updatedAt", {
        get: function () {
            return this._timeStampModel.updateAt || new Date();
        },
        enumerable: true,
        configurable: true
    });
    return ModelBase;
}());
Object.seal(ModelBase);
module.exports = ModelBase;
//# sourceMappingURL=ModelBase.js.map