"use strict";
class EvaluationModel {
    constructor(evaluationModel) {
        this.evaluationModel = evaluationModel;
        this._evaluationModel = evaluationModel;
    }
    get name() {
        return this._evaluationModel.name;
    }
    get createdAt() {
        return this._evaluationModel.createdAt;
    }
    get updatedAt() {
        return this._evaluationModel.updateAt || new Date();
    }
}
Object.seal(EvaluationModel);
module.exports = EvaluationModel;
