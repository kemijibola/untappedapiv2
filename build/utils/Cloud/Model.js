"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model = /** @class */ (function () {
    function Model(storage // private schedule: ICloudSchedule<T>
    ) {
        this.storage = storage;
    }
    Model.prototype.getObject = function (objParams) {
        return this.storage.getObject(objParams);
    };
    Model.prototype.putObject = function () { };
    Model.prototype.createSchedule = function () { };
    Model.prototype.processSchedule = function () { };
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=Model.js.map