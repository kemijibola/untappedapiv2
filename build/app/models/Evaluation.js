"use strict";
var EvaluationModel = /** @class */ (function () {
    function EvaluationModel(evaluationModel) {
        this.evaluationModel = evaluationModel;
        this._evaluationModel = evaluationModel;
    }
    Object.defineProperty(EvaluationModel.prototype, "name", {
        get: function () {
            return this._evaluationModel.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EvaluationModel.prototype, "createdAt", {
        get: function () {
            return this._evaluationModel.createdAt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EvaluationModel.prototype, "updatedAt", {
        get: function () {
            return this._evaluationModel.updateAt || new Date();
        },
        enumerable: true,
        configurable: true
    });
    return EvaluationModel;
}());
Object.seal(EvaluationModel);
module.exports = EvaluationModel;
//# sourceMappingURL=Evaluation.js.map