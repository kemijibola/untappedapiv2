"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TalentModel {
    constructor(talentModel) {
        this._talentModel = talentModel;
    }
    get stageName() {
        return this._talentModel.stageName || '';
    }
    get location() {
        return this._talentModel.location;
    }
    get phoneNumber() {
        return this._talentModel.phoneNumber;
    }
    get user() {
        return this._talentModel.user;
    }
    get shortBio() {
        return this._talentModel.shortBio || '';
    }
    get categories() {
        return this._talentModel.categories;
    }
    get socialMedias() {
        return this._talentModel.socialMedias || Object();
    }
    get profileImagePath() {
        return this._talentModel.profileImagePath || '';
    }
    get physicalStats() {
        return this._talentModel.physicalStats;
    }
}
Object.seal(TalentModel);
exports = TalentModel;
