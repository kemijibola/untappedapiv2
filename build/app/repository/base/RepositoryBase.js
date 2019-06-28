"use strict";
const mongoose = require("mongoose");
const async_1 = require("async");
const path_1 = require("path");
class RepositoryBase {
    constructor(schemaModel) {
        this._model = schemaModel;
    }
    create(item) {
        return new Promise((resolve, reject) => {
            this._model.create(item, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
    fetch() {
        return new Promise(() => {
            this._model.find({}, (error, result) => {
                if (error)
                    async_1.reject(error, error);
                else
                    path_1.resolve(result);
            });
        });
    }
    update(_id, item) {
        return new Promise((resolve, reject) => {
            this._model.update({ _id: _id }, item, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
    delete(_id) {
        return new Promise((resolve, reject) => {
            this._model.remove({ _id: this.toObjectId(_id) }, err => {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    }
    findById(_id) {
        return new Promise((resolve, reject) => {
            this._model.findById(_id, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
    toObjectId(_id) {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
}
module.exports = RepositoryBase;
