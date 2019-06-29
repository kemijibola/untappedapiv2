"use strict";
var ContestEntryModel = /** @class */ (function () {
    function ContestEntryModel(contestEntryModel) {
        this._contestEntryModel = contestEntryModel;
    }
    Object.defineProperty(ContestEntryModel.prototype, "user", {
        get: function () {
            return this._contestEntryModel.user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestEntryModel.prototype, "contest", {
        get: function () {
            return this._contestEntryModel.contest;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContestEntryModel.prototype, "submissionPath", {
        get: function () {
            return this._contestEntryModel.submissionPath;
        },
        enumerable: true,
        configurable: true
    });
    return ContestEntryModel;
}());
Object.seal(ContestEntryModel);
module.exports = ContestEntryModel;
//# sourceMappingURL=ContestEntry.js.map