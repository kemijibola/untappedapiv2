import ApplicationRepository from '../repository/ApplicationRepository';
import IApplicationBusiness = require('./interfaces/ApplicationBusiness');
import { IApproval, IApplication } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ApplicationBusiness implements IApplicationBusiness {
  private _applicationRepository: ApplicationRepository;

  constructor() {
    this._applicationRepository = new ApplicationRepository();
  }

  async fetch(condidtion: any): Promise<Result<IApplication>> {
    try {
      const applications = await this._applicationRepository.fetch(condidtion);
      return Result.ok<IApplication>(200, applications);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IApplication>> {
    try {
      if (!id) return Result.fail<IApplication>(400, 'Invalid id');
      const application = await this._applicationRepository.findById(id);
      if (!application)
        return Result.fail<IApplication>(
          404,
          `Application of Id ${id} not found`
        );
      else return Result.ok<IApplication>(200, application);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IApplication>> {
    try {
      const application = await this._applicationRepository.findByCriteria(
        criteria
      );
      if (!application)
        return Result.fail<IApplication>(404, `Application not found`);
      else return Result.ok<IApplication>(200, application);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IApplication): Promise<Result<IApplication>> {
    try {
      const newApplication = await this._applicationRepository.create(item);
      // TODO:: create approval request here
      return Result.ok<IApplication>(201, newApplication);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IApplication): Promise<Result<IApplication>> {
    try {
      const application = await this._applicationRepository.findById(id);
      if (!application)
        return Result.fail<IApplication>(
          404,
          `Could not update Application.Application of Id ${id} not found`
        );
      const updateObj = await this._applicationRepository.update(
        application._id,
        item
      );
      return Result.ok<IApplication>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._applicationRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(ApplicationBusiness);
export = ApplicationBusiness;
