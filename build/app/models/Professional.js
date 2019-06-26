"use strict";
class ProfessionalModel {
    constructor(professionalModel) {
        this._professionalModel = professionalModel;
    }
    get businessName() {
        return this._professionalModel.businessName;
    }
    get name() {
        return this._professionalModel.name;
    }
    get officialAddress() {
        return this._professionalModel.officialAddress;
    }
    get rcNumber() {
        return this._professionalModel.rcNumber;
    }
    get phoneNumbers() {
        return this._professionalModel.phoneNumbers;
    }
    get user() {
        return this._professionalModel.user;
    }
    get shortBio() {
        return this._professionalModel.shortBio;
    }
    get categories() {
        return this._professionalModel.categories;
    }
    get socialMedias() {
        return this._professionalModel.socialMedias;
    }
    get profileImagePath() {
        return this._professionalModel.profileImagePath || '';
    }
    get bannerImagePath() {
        return this._professionalModel.bannerImagePath || '';
    }
}
Object.seal(ProfessionalModel);
module.exports = ProfessionalModel;
