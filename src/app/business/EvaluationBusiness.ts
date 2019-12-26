import EvaluationRepository from "../repository/EvaluationRepository";
import IEvaluationBusiness = require("./interfaces/EvaluationBusiness");
import { IEvaluation } from "../models/interfaces";
import { Result } from "../../utils/Result";

class EvaluationBusiness implements IEvaluationBusiness {
  private _evaluationRepository: EvaluationRepository;

  constructor() {
    this._evaluationRepository = new EvaluationRepository();
  }

  async fetch(condition: any): Promise<Result<IEvaluation[]>> {
    const evaluations = await this._evaluationRepository.fetch(condition);
    return Result.ok<IEvaluation[]>(200, evaluations);
  }

  async findById(id: string): Promise<Result<IEvaluation>> {
    if (!id) return Result.fail<IEvaluation>(400, "Bad request.");
    const evaluation = await this._evaluationRepository.findById(id);
    if (!evaluation)
      return Result.fail<IEvaluation>(404, `Evaluation of Id ${id} not found`);
    return Result.ok<IEvaluation>(200, evaluation);
  }

  async findOne(condition: any): Promise<Result<IEvaluation>> {
    if (!condition) return Result.fail<IEvaluation>(400, "Bad request.");
    const evaluation = await this._evaluationRepository.findByOne(condition);
    if (!evaluation)
      return Result.fail<IEvaluation>(404, `Evaluation not found`);
    return Result.ok<IEvaluation>(200, evaluation);
  }

  async findByCriteria(criteria: any): Promise<Result<IEvaluation>> {
    const evaluation = await this._evaluationRepository.findByCriteria(
      criteria
    );
    if (!evaluation)
      return Result.fail<IEvaluation>(404, `Evaluation not found`);
    return Result.ok<IEvaluation>(200, evaluation);
  }

  async create(item: IEvaluation): Promise<Result<IEvaluation>> {
    const newEvaluation = await this._evaluationRepository.create(item);
    return Result.ok<IEvaluation>(201, newEvaluation);
  }

  async update(id: string, item: IEvaluation): Promise<Result<IEvaluation>> {
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
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._evaluationRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(EvaluationBusiness);
export = EvaluationBusiness;
