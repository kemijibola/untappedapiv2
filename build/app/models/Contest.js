"use strict";
var ContestModel = /** @class */ (function () {
    function ContestModel(contestModel) {
        this._contestModel = contestModel;
    }
    Object.defineProperty(ContestModel.prototype, "title", {
        get: function () {
            return this._contestModel.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "information", {
        get: function () {
            return this._contestModel.information;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "bannerImage", {
        get: function () {
            return this._contestModel.bannerImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "eligibleCategories", {
        get: function () {
            return this._contestModel.eligibleCategories;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "eligibilityInfo", {
        get: function () {
            return this._contestModel.eligibilityInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "submissionRules", {
        get: function () {
            return this._contestModel.submissionRules;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "startDate", {
        get: function () {
            return this._contestModel.startDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "duration", {
        get: function () {
            return this._contestModel.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "redeemable", {
        get: function () {
            return this._contestModel.redeemable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "endDate", {
        get: function () {
            return this._contestModel.endDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "createdBy", {
        get: function () {
            return this._contestModel.createdBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "maxContestant", {
        get: function () {
            return this._contestModel.maxContestant || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "grandFinaleDate", {
        get: function () {
            return this._contestModel.grandFinaleDate || new Date();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "grandFinaleLocation", {
        get: function () {
            return this._contestModel.grandFinaleLocation || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestModel.prototype, "evaluations", {
        get: function () {
            return this._contestModel.evaluations || [];
        },
        enumerable: true,
        configurable: true
    });
    return ContestModel;
}());
Object.seal(ContestModel);
module.exports = ContestModel;
//# sourceMappingURL=Contest.js.map