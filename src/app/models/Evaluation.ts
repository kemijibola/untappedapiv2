import { IEvaluation } from './interfaces';
import ModelBase from './base/ModelBase';

class EvaluationModel {
  private _evaluationModel: IEvaluation;

  constructor(private evaluationModel: IEvaluation) {
    this._evaluationModel = evaluationModel;
  }

  get name(): string {
    return this._evaluationModel.name;
  }
  get createdAt(): Date {
    return this._evaluationModel.createdAt;
  }
  get updatedAt(): Date {
    return this._evaluationModel.updateAt || new Date();
  }
}

Object.seal(EvaluationModel);
export = EvaluationModel;
