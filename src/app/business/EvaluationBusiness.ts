import EvaluationRepository from '../repository/EvaluationRepository';
import IEvaluationBusiness = require('./interfaces/EvaluationBusiness');
import { IEvaluation } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class EvaluationBusiness implements IEvaluationBusiness {
  private _evaluationRepository: EvaluationRepository;

  constructor() {
    this._evaluationRepository = new EvaluationRepository();
  }

  fetch(): Promise<IEvaluation> {
    return this._evaluationRepository.fetch();
  }

  findById(id: string): Promise<IEvaluation> {
    return this._evaluationRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IEvaluation> {
    return this.findByCriteria(criteria);
  }

  create(item: IEvaluation): Promise<IEvaluation> {
    return this._evaluationRepository.create(item);
  }

  async update(id: string, item: IEvaluation): Promise<IEvaluation> {
    const evaluationModel = await this._evaluationRepository.findById(id);
    if (!evaluationModel)
      throw new RecordNotFound(`Evaluation with id: ${id} not found`, 404);
    return this._evaluationRepository.update(evaluationModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._evaluationRepository.delete(id);
  }
}

Object.seal(EvaluationBusiness);
export = EvaluationBusiness;
