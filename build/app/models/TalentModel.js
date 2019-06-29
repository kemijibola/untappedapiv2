"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TalentModel = /** @class */ (function () {
    function TalentModel(talentModel) {
        this._talentModel = talentModel;
    }
    Object.defineProperty(TalentModel.prototype, "stageName", {
        get: function () {
            return this._talentModel.stageName || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TalentModel.prototype, "location", {
        get: function () {
            return this._talentModel.location;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TalentModel.prototype, "phoneNumber", {
        get: function () {
            return this._talentModel.phoneNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TalentModel.prototype, "user", {
        get: function () {
            return this._talentModel.user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TalentModel.prototype, "shortBio", {
        get: function () {
            return this._talentModel.shortBio || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TalentModel.prototype, "categories", {
        get: function () {
            return this._talentModel.categories;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TalentModel.prototype, "socialMedias", {
        get: function () {
            return this._talentModel.socialMedias || Object();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TalentModel.prototype, "profileImagePath", {
        get: function () {
            return this._talentModel.profileImagePath || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TalentModel.prototype, "physicalStats", {
        get: function () {
            return this._talentModel.physicalStats;
        },
        enumerable: true,
        configurable: true
    });
    return TalentModel;
}());
Object.seal(TalentModel);
exports = TalentModel;
//# sourceMappingURL=TalentModel.js.map