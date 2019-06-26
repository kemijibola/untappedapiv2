"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GigModel {
    constructor(gigModel) {
        this._gigModel = gigModel;
    }
    get sender() {
        return this._gigModel.sender;
    }
    get receiver() {
        return this._gigModel.receiver;
    }
    get note() {
        return this._gigModel.note;
    }
    get items() {
        return this._gigModel.items;
    }
    get deletedBySender() {
        return this._gigModel.deletedBySender;
    }
    get deletedByReciver() {
        return this._gigModel.deletedByReciver;
    }
}
Object.seal(GigModel);
exports = GigModel;
