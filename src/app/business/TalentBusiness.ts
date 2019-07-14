import TalentRepository from '../repository/TalentRepository';
import ITalentBusiness = require('./interfaces/TalentBusiness');
import { ITalent } from '../models/interfaces';
import { Result } from '../../utils/Result';

class TalentBusiness implements ITalentBusiness {
  private _talentRepository: TalentRepository;

  constructor() {
    this._talentRepository = new TalentRepository();
  }

  async fetch(): Promise<Result<ITalent>> {
    try {
      const talents = await this._talentRepository.fetch();
      return Result.ok<ITalent>(200, talents);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<ITalent>> {
    try {
      const talent = await this._talentRepository.findById(id);
      if (!talent)
        return Result.fail<ITalent>(404, `Talent of Id ${id} not found`);
      else return Result.ok<ITalent>(200, talent);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<ITalent>> {
    try {
      const talent = await this._talentRepository.findByCriteria(criteria);
      if (!talent) return Result.fail<ITalent>(404, `Talent not found`);
      else return Result.ok<ITalent>(200, talent);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: ITalent): Promise<Result<ITalent>> {
    try {
      const newTalent = await this._talentRepository.create(item);
      return Result.ok<ITalent>(201, newTalent);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: ITalent): Promise<Result<ITalent>> {
    try {
      const talent = await this._talentRepository.findById(id);
      if (!talent)
        return Result.fail<ITalent>(
          404,
          `Could not update talent.Talent of Id ${id} not found`
        );
      const updateObj = await this._talentRepository.update(talent._id, item);
      return Result.ok<ITalent>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._talentRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(TalentBusiness);
export = TalentBusiness;
