"use strict";
var mongoose = require("mongoose");
var async_1 = require("async");
var path_1 = require("path");
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
    RepositoryBase.prototype.fetch = function () {
        var _this = this;
        return new Promise(function () {
            _this._model.find({}, function (error, result) {
                if (error)
                    async_1.reject(error, error);
                else
                    path_1.resolve(result);
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
            _this._model.remove({ _id: _this.toObjectId(_id) }, function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
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
    RepositoryBase.prototype.toObjectId = function (_id) {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    };
    return RepositoryBase;
}());
module.exports = RepositoryBase;
//# sourceMappingURL=RepositoryBase.js.map