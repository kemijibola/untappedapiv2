import PrizeTypeRepository from "../repository/PrizeTypeRepository";
import IPrizeTypeBusiness = require("./interfaces/PrizeTypeBusiness");
import { IPrizeType } from "../models/interfaces";
import { Result } from "../../utils/Result";

class PrizeTypeBusiness implements IPrizeTypeBusiness {
  private _prizeTypeRepository: PrizeTypeRepository;

  constructor() {
    this._prizeTypeRepository = new PrizeTypeRepository();
  }

  async fetch(condition: any): Promise<Result<IPrizeType[]>> {
    const prizeTypes = await this._prizeTypeRepository.fetch(condition);
    return Result.ok<IPrizeType[]>(200, prizeTypes);
  }

  async findById(id: string): Promise<Result<IPrizeType>> {
    if (!id) return Result.fail<IPrizeType>(400, "Bad request");
    const prizeType = await this._prizeTypeRepository.findById(id);
    if (!prizeType)
      return Result.fail<IPrizeType>(404, `Prize type of Id ${id} not found`);
    return Result.ok<IPrizeType>(200, prizeType);
  }

  async findOne(condition: any): Promise<Result<IPrizeType>> {
    if (!condition) return Result.fail<IPrizeType>(400, "Bad request");
    const prizeType = await this._prizeTypeRepository.findByOne(condition);
    if (!prizeType) return Result.fail<IPrizeType>(404, `Prize type not found`);
    return Result.ok<IPrizeType>(200, prizeType);
  }

  async findByCriteria(criteria: any): Promise<Result<IPrizeType>> {
    const prizeType = await this._prizeTypeRepository.findByCriteria(criteria);
    if (!prizeType) return Result.fail<IPrizeType>(404, `Prize type not found`);
    return Result.ok<IPrizeType>(200, prizeType);
  }

  async create(item: IPrizeType): Promise<Result<IPrizeType>> {
    const newPrizeType = await this._prizeTypeRepository.create(item);
    return Result.ok<IPrizeType>(201, newPrizeType);
  }

  async update(id: string, item: IPrizeType): Promise<Result<IPrizeType>> {
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
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._prizeTypeRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(PrizeTypeBusiness);
export = PrizeTypeBusiness;
