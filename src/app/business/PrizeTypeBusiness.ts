import PrizeTypeRepository from '../repository/PrizeTypeRepository';
import IPrizeTypeBusiness = require('./interfaces/PrizeTypeBusiness');
import { IPrizeType } from '../models/interfaces';
import { Result } from '../../utils/Result';

class PrizeTypeBusiness implements IPrizeTypeBusiness {
  private _prizeTypeRepository: PrizeTypeRepository;

  constructor() {
    this._prizeTypeRepository = new PrizeTypeRepository();
  }

  async fetch(): Promise<Result<IPrizeType>> {
    try {
      const prizeTypes = await this._prizeTypeRepository.fetch();
      return Result.ok<IPrizeType>(200, prizeTypes);
    } catch (err) {
      return Result.fail<IPrizeType>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<IPrizeType>> {
    try {
      const prizeType = await this._prizeTypeRepository.findById(id);
      if (!prizeType._id)
        return Result.fail<IPrizeType>(404, `Prize type of Id ${id} not found`);
      else return Result.ok<IPrizeType>(200, prizeType);
    } catch (err) {
      return Result.fail<IPrizeType>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IPrizeType>> {
    try {
      const prizeType = await this._prizeTypeRepository.findByCriteria(
        criteria
      );
      if (!prizeType._id)
        return Result.fail<IPrizeType>(404, `Prize type not found`);
      else return Result.ok<IPrizeType>(200, prizeType);
    } catch (err) {
      return Result.fail<IPrizeType>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(item: IPrizeType): Promise<Result<IPrizeType>> {
    try {
      const newPrizeType = await this._prizeTypeRepository.create(item);
      return Result.ok<IPrizeType>(201, newPrizeType);
    } catch (err) {
      return Result.fail<IPrizeType>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(id: string, item: IPrizeType): Promise<Result<IPrizeType>> {
    try {
      const prizeType = await this._prizeTypeRepository.findById(id);
      if (!prizeType._id)
        return Result.fail<IPrizeType>(
          404,
          `Could not update prize type.Prize type of Id ${id} not found`
        );
      const updateObj = await this._prizeTypeRepository.update(
        prizeType._id,
        item
      );
      return Result.ok<IPrizeType>(200, updateObj);
    } catch (err) {
      return Result.fail<IPrizeType>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._prizeTypeRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(PrizeTypeBusiness);
export = PrizeTypeBusiness;
