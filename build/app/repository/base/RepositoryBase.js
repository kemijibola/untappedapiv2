"use strict";
var mongoose = require("mongoose");
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
        return new Promise(function (resolve, reject) {
            _this._model.find(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    };
    RepositoryBase.prototype.update = function (_id, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model.update({ _id: _id }, item, function (error, result) {
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
            _this._model
                .remove({ _id: _this.toObjectId(_id) }, function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            })
                .cache({ collectionName: _this._model.collection.name });
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
        });
    };
    RepositoryBase.prototype.findByCriteria = function (criteria) {
        var _this = this;
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
        return mongoose.Types.ObjectId.createFromHexString(_id);
    };
    return RepositoryBase;
}());
module.exports = RepositoryBase;
//# sourceMappingURL=RepositoryBase.js.map