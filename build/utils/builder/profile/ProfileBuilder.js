"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Profile_1 = __importDefault(require("./Profile"));
var ProfileBuilder = /** @class */ (function () {
    function ProfileBuilder(user) {
        this._stageName = '';
        this._location = '';
        this._shortBio = '';
        this._categories = [];
        this._socialMedias = [];
        this._profileImagePath = '';
        this._physicalStats = {
            bodyType: '',
            color: '',
            height: ''
        };
        this._businessName = '';
        this._officialAddress = '';
        this._rcNumber = '';
        this._phoneNumbers = [];
        this._bannerImagePath = '';
        this._user = user;
    }
    ProfileBuilder.prototype.createTalent = function (stageName, physicalStat) {
        this._stageName = stageName;
        this._physicalStats = physicalStat;
        return this;
    };
    ProfileBuilder.prototype.createProfessional = function (businessName, rcNumber, bannerImage, officialAddress) {
        this._businessName = businessName;
        this._rcNumber = rcNumber;
        this._bannerImagePath = bannerImage;
        this._officialAddress = officialAddress;
        return this;
    };
    ProfileBuilder.prototype.createBasicInfo = function (location, profilePicture, phoneNumbers, shortBio, categories) {
        this._location = location;
        this._profileImagePath = profilePicture;
        this._phoneNumbers = phoneNumbers;
        this._shortBio = shortBio;
        this._categories = categories;
        return this;
    };
    Object.defineProperty(ProfileBuilder.prototype, "stageName", {
        get: function () {
            return this._stageName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileBuilder.prototype, "location", {
        get: function () {
            return this._location;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileBuilder.prototype, "user", {
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileBuilder.prototype, "shortBio", {
        get: function () {
            return this._shortBio;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileBuilder.prototype, "categories", {
        get: function () {
            return this._categories;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileBuilder.prototype, "socialMedias", {
        get: function () {
            return this._socialMedias;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileBuilder.prototype, "profileImagePath", {
        get: function () {
            return this._profileImagePath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileBuilder.prototype, "physicalStatistics", {
        get: function () {
            return this._physicalStats;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileBuilder.prototype, "businessName", {
        get: function () {
            return this._businessName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileBuilder.prototype, "officialAddress", {
        get: function () {
            return this._officialAddress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileBuilder.prototype, "rcNumber", {
        get: function () {
            return this._rcNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileBuilder.prototype, "phoneNumbers", {
        get: function () {
            return this._phoneNumbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileBuilder.prototype, "bannerImagePath", {
        get: function () {
            return this._bannerImagePath;
        },
        enumerable: true,
        configurable: true
    });
    ProfileBuilder.prototype.build = function () {
        return new Profile_1.default(this);
    };
    return ProfileBuilder;
}());
Object.seal(ProfileBuilder);
module.exports = ProfileBuilder;
//# sourceMappingURL=ProfileBuilder.js.map