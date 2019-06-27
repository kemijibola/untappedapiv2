import EvaluationRepository from '../repository/EvaluationRepository';
import IEvaluationBusiness from './interface/EvaluationBusiness';
import { IEvaluation } from '../models/interfaces';

class EvaluationBusiness implements IEvaluationBusiness {
  private _evaluationRepository: EvaluationRepository;

  constructor() {
    this._evaluationRepository = new EvaluationRepository();
  }

  create(item: IEvaluation, callback: (error: any, result: any) => void) {
    this._evaluationRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._evaluationRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IEvaluation,
    callback: (error: any, result: any) => void
  ) {
    this._evaluationRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._evaluationRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._evaluationRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IEvaluation) => void) {
    this._evaluationRepository.findById(_id, callback);
  }
}
Object.seal(EvaluationBusiness);
export = EvaluationBusiness;
