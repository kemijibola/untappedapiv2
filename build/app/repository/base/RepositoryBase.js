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
    RepositoryBase.prototype.createCommentWithUser = function (item) {
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
    RepositoryBase.prototype.populateFetch = function (path, condition) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model
                .find(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .populate(path, "_id name")
                // .cacheDocQueries({ collectionName: this._model.collection.name })
                .exec();
        });
    };
    // fetchWithDeepUserDetails(condition: any): Promise<any> {
    //   return new Promise((resolve, reject) => {
    //     this._model
    //       .find(condition, (error: any, result: any) => {
    //         if (error) reject(error);
    //         else resolve(result);
    //       })
    //       .populate("user", "_id fullName profileImagePath")
    //       // .cacheDocQueries({ collectionName: this._model.collection.name })
    //       .exec();
    //   });
    // }
    RepositoryBase.prototype.fetchFirstOrDefaultWithUser = function (condition) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model
                .findOne(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .populate("user", "_id fullName")
                // .cacheDocQueries({ collectionName: this._model.collection.name })
                .exec();
        });
    };
    RepositoryBase.prototype.fetchWithUser = function (condition) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model
                .find(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .populate("user", "_id fullName profileImagePath")
                // .cacheDocQueries({ collectionName: this._model.collection.name })
                .exec();
        });
    };
    RepositoryBase.prototype.fetchWithUserDetails = function (condition) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model
                .find(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .populate("user", "_id fullName email profileImagePath")
                .populate("likedBy", "_id fullName")
                .populate("replies.user", "_id fullName profileImagePath")
                // .cacheDocQueries({ collectionName: this._model.collection.name })
                .exec();
        });
    };
    RepositoryBase.prototype.fetchContestEntryWithContest = function (condition) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model
                .find(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .populate("contest", "_id title entryMediaType bannerImage views likedBy")
                // .cacheDocQueries({ collectionName: this._model.collection.name })
                .exec();
        });
    };
    RepositoryBase.prototype.fetchTransactionsOrderedByDate = function (condition) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model
                .find(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .sort({
                createdAt: -1,
            })
                // .cacheDocQueries({ collectionName: this._model.collection.name })
                .exec();
        });
    };
    RepositoryBase.prototype.fetchContestEntryPaginated = function (condition, page, perPage) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (perPage === void 0) { perPage = 10; }
        return new Promise(function (resolve, reject) {
            _this._model
                .find(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .populate("user", "_id fullName profileImagePath")
                .skip(perPage * page - perPage)
                .limit(perPage)
                .sort({
                createdAt: -1,
            })
                // .cacheDocQueries({ collectionName: this._model.collection.name })
                .exec();
        });
    };
    RepositoryBase.prototype.fetchWithLimit = function (condition, limit) {
        var _this = this;
        if (limit === void 0) { limit = 10; }
        return new Promise(function (resolve, reject) {
            _this._model
                .find(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .limit(limit)
                // .cacheDocQueries({ collectionName: this._model.collection.name })
                .exec();
        });
    };
    RepositoryBase.prototype.fetchContests = function (condition, page, perPage) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (perPage === void 0) { perPage = 10; }
        return new Promise(function (resolve, reject) {
            _this._model
                .find(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .skip(perPage * page - perPage)
                .limit(perPage)
                .sort({
                endDate: "desc",
            })
                // .cacheDocQueries({ collectionName: this._model.collection.name })
                .exec();
        });
    };
    RepositoryBase.prototype.paginatedFetch = function (condition, page, perPage) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (perPage === void 0) { perPage = 10; }
        return new Promise(function (resolve, reject) {
            _this._model
                .find(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .skip(perPage * page - perPage)
                .limit(perPage)
                .sort({
                createdAt: -1,
            })
                // .cacheDocQueries({ collectionName: this._model.collection.name })
                .exec();
        });
    };
    RepositoryBase.prototype.fetch = function (condition) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model
                .find(condition, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                //.cacheDocQueries({ collectionName: this._model.collection.name })
                .exec();
        });
    };
    RepositoryBase.prototype.update = function (_id, item) {
        var _this = this;
        var options = { new: true, useFindAndModify: false };
        return new Promise(function (resolve, reject) {
            _this._model.findByIdAndUpdate(_id, item, options, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    };
    RepositoryBase.prototype.patch = function (_id, item) {
        var _this = this;
        var options = { new: true, useFindAndModify: false };
        return new Promise(function (resolve, reject) {
            _this._model.findByIdAndUpdate(_id, item, options, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    };
    RepositoryBase.prototype.insertMany = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model.insertMany(item, function (error, result) {
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
            _this._model.deleteOne({ _id: _this.toObjectId(_id) }, function (err) {
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
    RepositoryBase.prototype.findIdWithDetails = function (path, _id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model
                .findById(_id, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .populate(path)
                // .cacheDocQueries({ collectionName: this._model.collection.name })
                .exec();
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
            // .cacheDocQuery({ collectionName: this._model.collection.name });
        });
    };
    RepositoryBase.prototype.toObjectId = function (_id) {
        return mongoose_1.default.Types.ObjectId.createFromHexString(_id);
    };
    RepositoryBase.prototype.deleteMany = function (criteria) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._model.deleteMany(criteria, function (error) {
                if (error)
                    reject(error);
                else
                    resolve(true);
            });
        });
    };
    return RepositoryBase;
}());
module.exports = RepositoryBase;
//# sourceMappingURL=RepositoryBase.js.map