"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GigModel = /** @class */ (function () {
    function GigModel(gigModel) {
        this._gigModel = gigModel;
    }
    Object.defineProperty(GigModel.prototype, "sender", {
        get: function () {
            return this._gigModel.sender;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GigModel.prototype, "receiver", {
        get: function () {
            return this._gigModel.receiver;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GigModel.prototype, "note", {
        get: function () {
            return this._gigModel.note;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GigModel.prototype, "items", {
        get: function () {
            return this._gigModel.items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GigModel.prototype, "deletedBySender", {
        get: function () {
            return this._gigModel.deletedBySender;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GigModel.prototype, "deletedByReciver", {
        get: function () {
            return this._gigModel.deletedByReciver;
        },
        enumerable: true,
        configurable: true
    });
    return GigModel;
}());
Object.seal(GigModel);
exports = GigModel;
//# sourceMappingURL=Gig.js.map