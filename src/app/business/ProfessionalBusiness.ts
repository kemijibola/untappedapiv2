import ProfessionalRepository from '../repository/ProfessionalRepository';
import IProfessionalBusiness = require('./interfaces/ProfessionalBusiness');
import { IProfessional } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ProfessionalBusiness implements IProfessionalBusiness {
  private _professionalRepository: ProfessionalRepository;

  constructor() {
    this._professionalRepository = new ProfessionalRepository();
  }

  async fetch(): Promise<Result<IProfessional>> {
    try {
      const professionals = await this._professionalRepository.fetch();
      return Result.ok<IProfessional>(200, professionals);
    } catch (err) {
      return Result.fail<IProfessional>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<IProfessional>> {
    try {
      const professional = await this._professionalRepository.findById(id);
      if (!professional._id)
        return Result.fail<IProfessional>(
          404,
          `Professional of Id ${id} not found`
        );
      else return Result.ok<IProfessional>(200, professional);
    } catch (err) {
      return Result.fail<IProfessional>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IProfessional>> {
    try {
      const professional = await this._professionalRepository.findByCriteria(
        criteria
      );
      if (!professional._id)
        return Result.fail<IProfessional>(404, `Professional not found`);
      else return Result.ok<IProfessional>(200, professional);
    } catch (err) {
      return Result.fail<IProfessional>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(item: IProfessional): Promise<Result<IProfessional>> {
    try {
      const newProfessional = await this._professionalRepository.create(item);
      return Result.ok<IProfessional>(201, newProfessional);
    } catch (err) {
      return Result.fail<IProfessional>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(
    id: string,
    item: IProfessional
  ): Promise<Result<IProfessional>> {
    try {
      const professional = await this._professionalRepository.findById(id);
      if (!professional._id)
        return Result.fail<IProfessional>(
          404,
          `Could not update professional.Professional of Id ${id} not found`
        );
      const updateObj = await this._professionalRepository.update(
        professional._id,
        item
      );
      return Result.ok<IProfessional>(200, updateObj);
    } catch (err) {
      return Result.fail<IProfessional>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._professionalRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(ProfessionalBusiness);
export = ProfessionalBusiness;
