"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
var RepositoryBase = /** @class */ (function () {
    function RepositoryBase(schemaModel) {
        this._model = schemaModel;
    }
    RepositoryBase.prototype.create = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model.create(item, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    };
    RepositoryBase.prototype.fetch = function (condition) {
        var _this = this;
        if (condition === void 0) { condition = {}; }
        return new Promise(function (resolve, reject) {
            _this._model
                .find(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .cacheDocQueries({ collectionName: _this._model.collection.name })
                .exec();
        });
    };
    RepositoryBase.prototype.update = function (_id, item) {
        var _this = this;
        var options = { new: true, useFindAndModify: false };
        return new Promise(function (resolve, reject) {
            _this._model.findByIdAndUpdate({ _id: _id }, item, options, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    };
    RepositoryBase.prototype.updateMany = function (_ids, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model.updateMany({ _id: _ids }, item, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    };
    RepositoryBase.prototype.delete = function (_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model.remove({ _id: _this.toObjectId(_id) }, function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
            // .cache({ collectionName: this._model.collection.name });
        });
    };
    RepositoryBase.prototype.findByOne = function (condition) {
        var _this = this;
        if (condition === void 0) { condition = {}; }
        return new Promise(function (resolve, reject) {
            _this._model.findOne(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
            // .cacheDocQuery({ collectionName: this._model.collection.name });
        });
    };
    RepositoryBase.prototype.findById = function (_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model.findById(_id, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
            // .cacheDocQuery({ collectionName: this._model.collection.name });
        });
    };
    RepositoryBase.prototype.findByIdCriteria = function (criteria) {
        var _this = this;
        if (criteria === void 0) { criteria = {}; }
        return new Promise(function (resolve, reject) {
            _this._model.findById(criteria, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
            // .cacheDocQuery({ collectionName: this._model.collection.name });
        });
    };
    RepositoryBase.prototype.findByCriteria = function (criteria) {
        var _this = this;
        if (criteria === void 0) { criteria = {}; }
        return new Promise(function (resolve, reject) {
            _this._model.findOne(criteria, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    };
    RepositoryBase.prototype.toObjectId = function (_id) {
        return mongoose_1.default.Types.ObjectId.createFromHexString(_id);
    };
    return RepositoryBase;
}());
module.exports = RepositoryBase;
//# sourceMappingURL=RepositoryBase.js.map