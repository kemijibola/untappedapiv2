import ApplicationRepository from '../repository/ApplicationRepository';
import IApplicationBusiness = require('./interfaces/ApplicationBusiness');
import { IApproval, IApplication } from '../models/interfaces';
import { Result } from '../../utils/Result';
import { ApplicationViewModel } from '../models/viewmodels';

class ApplicationBusiness implements IApplicationBusiness {
  private _applicationRepository: ApplicationRepository;

  constructor() {
    this._applicationRepository = new ApplicationRepository();
  }

  async fetch(condidtion: any): Promise<Result<any[]>> {
    try {
      let refinedApplications: ApplicationViewModel[] = [];
      const applications = await this._applicationRepository.fetch(condidtion);
      for (let application of applications) {
        const applicationViewModel: ApplicationViewModel = {
          _id: application._id,
          name: application.name,
          dbUri: application.dbUri,
          identity: application.identity,
          secret: application.secret,
          domain: application.domain
        };
        refinedApplications = [...refinedApplications, applicationViewModel];
      }
      return Result.ok<ApplicationViewModel[]>(200, refinedApplications);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<any>> {
    try {
      if (!id) return Result.fail<IApplication>(400, 'Invalid id');
      const application = await this._applicationRepository.findById(id);
      if (!application) {
        return Result.fail<IApplication>(
          404,
          `Application of Id ${id} not found`
        );
      } else {
        let refinedApplication: ApplicationViewModel = {
          _id: application._id,
          name: application.name,
          dbUri: application.dbUri,
          identity: application.identity,
          secret: application.secret,
          domain: application.domain
        };
        return Result.ok<ApplicationViewModel>(200, refinedApplication);
      }
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<any>> {
    try {
      criteria.isActive = true;
      const application = await this._applicationRepository.findByCriteria(
        criteria
      );
      if (!application) {
        return Result.fail<ApplicationViewModel>(404, `Application not found`);
      } else {
        let refinedApplication: ApplicationViewModel = {
          _id: application._id,
          name: application.name,
          dbUri: application.dbUri,
          identity: application.identity,
          secret: application.secret,
          domain: application.domain
        };
        return Result.ok<ApplicationViewModel>(200, refinedApplication);
      }
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IApplication): Promise<Result<any>> {
    try {
      // TODO:: confirm validity of country id before saving
      const newApplication = await this._applicationRepository.create(item);
      // TODO:: create approval request here
      let refinedApplication: ApplicationViewModel = {
        _id: newApplication._id,
        name: newApplication.name,
        dbUri: newApplication.dbUri,
        identity: newApplication.identity,
        secret: newApplication.secret,
        domain: newApplication.domain
      };
      return Result.ok<ApplicationViewModel>(201, refinedApplication);
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
          `Could not update Application.Application with Id ${id} not found`
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
