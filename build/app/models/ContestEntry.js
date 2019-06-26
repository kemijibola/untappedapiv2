"use strict";
class ContestEntryModel {
    constructor(contestEntryModel) {
        this._contestEntryModel = contestEntryModel;
    }
    get user() {
        return this._contestEntryModel.user;
    }
    get contest() {
        return this._contestEntryModel.contest;
    }
    get submissionPath() {
        return this._contestEntryModel.submissionPath;
    }
}
Object.seal(ContestEntryModel);
module.exports = ContestEntryModel;
