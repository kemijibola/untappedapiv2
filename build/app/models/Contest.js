"use strict";
class ContestModel {
    constructor(contestModel) {
        this._contestModel = contestModel;
    }
    get title() {
        return this._contestModel.title;
    }
    get information() {
        return this._contestModel.information;
    }
    get bannerImage() {
        return this._contestModel.bannerImage;
    }
    get eligibleCategories() {
        return this._contestModel.eligibleCategories;
    }
    get eligibilityInfo() {
        return this._contestModel.eligibilityInfo;
    }
    get submissionRules() {
        return this._contestModel.submissionRules;
    }
    get startDate() {
        return this._contestModel.startDate;
    }
    get duration() {
        return this._contestModel.duration;
    }
    get redeemable() {
        return this._contestModel.redeemable;
    }
    get endDate() {
        return this._contestModel.endDate;
    }
    get createdBy() {
        return this._contestModel.createdBy;
    }
    get maxContestant() {
        return this._contestModel.maxContestant || 0;
    }
    get grandFinaleDate() {
        return this._contestModel.grandFinaleDate || new Date();
    }
    get grandFinaleLocation() {
        return this._contestModel.grandFinaleLocation || '';
    }
    get evaluations() {
        return this._contestModel.evaluations || [];
    }
}
Object.seal(ContestModel);
module.exports = ContestModel;
