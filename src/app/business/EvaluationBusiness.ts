import EvaluationRepository from '../repository/EvaluationRepository';
import IEvaluationBusiness = require('./interfaces/EvaluationBusiness');
import { IEvaluation } from '../models/interfaces';
import { Result } from '../../utils/Result';

class EvaluationBusiness implements IEvaluationBusiness {
  private _evaluationRepository: EvaluationRepository;

  constructor() {
    this._evaluationRepository = new EvaluationRepository();
  }

  async fetch(): Promise<Result<IEvaluation>> {
    try {
      const evaluations = await this._evaluationRepository.fetch();
      return Result.ok<IEvaluation>(200, evaluations);
    } catch (err) {
      return Result.fail<IEvaluation>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<IEvaluation>> {
    try {
      const evaluation = await this._evaluationRepository.findById(id);
      if (!evaluation)
        return Result.fail<IEvaluation>(
          404,
          `Evaluation of Id ${id} not found`
        );
      else return Result.ok<IEvaluation>(200, evaluation);
    } catch (err) {
      return Result.fail<IEvaluation>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IEvaluation>> {
    try {
      const evaluation = await this._evaluationRepository.findByCriteria(
        criteria
      );
      if (!evaluation)
        return Result.fail<IEvaluation>(404, `Evaluation not found`);
      else return Result.ok<IEvaluation>(200, evaluation);
    } catch (err) {
      return Result.fail<IEvaluation>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(item: IEvaluation): Promise<Result<IEvaluation>> {
    try {
      const newEvaluation = await this._evaluationRepository.create(item);
      return Result.ok<IEvaluation>(201, newEvaluation);
    } catch (err) {
      return Result.fail<IEvaluation>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(id: string, item: IEvaluation): Promise<Result<IEvaluation>> {
    try {
      const evaluation = await this._evaluationRepository.findById(id);
      if (!evaluation)
        return Result.fail<IEvaluation>(
          404,
          `Could not update evaluation.Evaluation of Id ${id} not found`
        );
      const updateObj = await this._evaluationRepository.update(
        evaluation._id,
        item
      );
      return Result.ok<IEvaluation>(200, updateObj);
    } catch (err) {
      return Result.fail<IEvaluation>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._evaluationRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(EvaluationBusiness);
export = EvaluationBusiness;
