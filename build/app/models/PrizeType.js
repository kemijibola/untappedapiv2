"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrizeTypeModel {
    constructor(prizeTypeModel) {
        this._prizeTypeModel = prizeTypeModel;
    }
    get name() {
        return this._prizeTypeModel.name;
    }
}
Object.seal(PrizeTypeModel);
exports = PrizeTypeModel;
