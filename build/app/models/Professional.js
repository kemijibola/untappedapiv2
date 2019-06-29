"use strict";
var ProfessionalModel = /** @class */ (function () {
    function ProfessionalModel(professionalModel) {
        this._professionalModel = professionalModel;
    }
    Object.defineProperty(ProfessionalModel.prototype, "businessName", {
        get: function () {
            return this._professionalModel.businessName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "name", {
        get: function () {
            return this._professionalModel.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "officialAddress", {
        get: function () {
            return this._professionalModel.officialAddress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "rcNumber", {
        get: function () {
            return this._professionalModel.rcNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "phoneNumbers", {
        get: function () {
            return this._professionalModel.phoneNumbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "user", {
        get: function () {
            return this._professionalModel.user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "shortBio", {
        get: function () {
            return this._professionalModel.shortBio;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "categories", {
        get: function () {
            return this._professionalModel.categories;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "socialMedias", {
        get: function () {
            return this._professionalModel.socialMedias;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "profileImagePath", {
        get: function () {
            return this._professionalModel.profileImagePath || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "bannerImagePath", {
        get: function () {
            return this._professionalModel.bannerImagePath || '';
        },
        enumerable: true,
        configurable: true
    });
    return ProfessionalModel;
}());
Object.seal(ProfessionalModel);
module.exports = ProfessionalModel;
//# sourceMappingURL=Professional.js.map