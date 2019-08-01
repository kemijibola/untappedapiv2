import PrizeTypeRepository from '../repository/PrizeTypeRepository';
import IPrizeTypeBusiness = require('./interfaces/PrizeTypeBusiness');
import { IPrizeType } from '../models/interfaces';
import { Result } from '../../utils/Result';

class PrizeTypeBusiness implements IPrizeTypeBusiness {
  private _prizeTypeRepository: PrizeTypeRepository;

  constructor() {
    this._prizeTypeRepository = new PrizeTypeRepository();
  }

  async fetch(condition: any): Promise<Result<IPrizeType[]>> {
    try {
      const prizeTypes = await this._prizeTypeRepository.fetch(condition);
      return Result.ok<IPrizeType[]>(200, prizeTypes);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IPrizeType>> {
    try {
      const prizeType = await this._prizeTypeRepository.findById(id);
      if (!prizeType)
        return Result.fail<IPrizeType>(404, `Prize type of Id ${id} not found`);
      else return Result.ok<IPrizeType>(200, prizeType);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IPrizeType>> {
    try {
      const prizeType = await this._prizeTypeRepository.findByCriteria(
        criteria
      );
      if (!prizeType)
        return Result.fail<IPrizeType>(404, `Prize type not found`);
      else return Result.ok<IPrizeType>(200, prizeType);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IPrizeType): Promise<Result<IPrizeType>> {
    try {
      const newPrizeType = await this._prizeTypeRepository.create(item);
      return Result.ok<IPrizeType>(201, newPrizeType);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IPrizeType): Promise<Result<IPrizeType>> {
    try {
      const prizeType = await this._prizeTypeRepository.findById(id);
      if (!prizeType)
        return Result.fail<IPrizeType>(
          404,
          `Could not update prize type.Prize type with Id ${id} not found`
        );
      const updateObj = await this._prizeTypeRepository.update(
        prizeType._id,
        item
      );
      return Result.ok<IPrizeType>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._prizeTypeRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(PrizeTypeBusiness);
export = PrizeTypeBusiness;
