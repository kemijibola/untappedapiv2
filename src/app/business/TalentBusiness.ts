import TalentRepository from '../repository/TalentRepository';
import ITalentBusiness = require('./interfaces/TalentBusiness');
import { ITalent } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';
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
      return Result.fail<ITalent>(500, `Internal server error occured. ${err}`);
    }
  }

  async findById(id: string): Promise<Result<ITalent>> {
    try {
      const talent = await this._talentRepository.findById(id);
      if (!talent._id)
        return Result.fail<ITalent>(404, `Talent of Id ${id} not found`);
      else return Result.ok<ITalent>(200, talent);
    } catch (err) {
      return Result.fail<ITalent>(500, `Internal server error occured. ${err}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<ITalent>> {
    try {
      const talent = await this._talentRepository.findByCriteria(criteria);
      if (!talent._id) return Result.fail<ITalent>(404, `Talent not found`);
      else return Result.ok<ITalent>(200, talent);
    } catch (err) {
      return Result.fail<ITalent>(500, `Internal server error occured. ${err}`);
    }
  }

  async create(item: ITalent): Promise<Result<ITalent>> {
    try {
      const newTalent = await this._talentRepository.create(item);
      return Result.ok<ITalent>(201, newTalent);
    } catch (err) {
      return Result.fail<ITalent>(500, `Internal server error occured. ${err}`);
    }
  }

  async update(id: string, item: ITalent): Promise<Result<ITalent>> {
    try {
      const talent = await this._talentRepository.findById(id);
      if (!talent._id)
        return Result.fail<ITalent>(
          404,
          `Could not update talent.Talent of Id ${id} not found`
        );
      const updateObj = await this._talentRepository.update(talent._id, item);
      return Result.ok<ITalent>(200, updateObj);
    } catch (err) {
      return Result.fail<ITalent>(500, `Internal server error occured. ${err}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._talentRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(TalentBusiness);
export = TalentBusiness;
