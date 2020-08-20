import ApplicationRepository from "../repository/ApplicationRepository";
import IApplicationBusiness = require("./interfaces/ApplicationBusiness");
import { IApproval, IApplication } from "../models/interfaces";
import { Result } from "../../utils/Result";
import btoa from "btoa";
import { ApplicationViewModel } from "../models/viewmodels";

class ApplicationBusiness implements IApplicationBusiness {
  private _applicationRepository: ApplicationRepository;

  constructor() {
    this._applicationRepository = new ApplicationRepository();
  }

  async fetch(condidtion: any): Promise<Result<IApplication[]>> {
    let refinedApplications: ApplicationViewModel[] = [];
    const applications = await this._applicationRepository.fetch(condidtion);
    return Result.ok<IApplication[]>(200, applications);
  }

  async findById(id: string): Promise<Result<IApplication>> {
    if (!id) return Result.fail<IApplication>(400, "Bad request.");
    const application = await this._applicationRepository.findById(id);
    if (!application) {
      return Result.fail<IApplication>(404, `Application not found`);
    }
    return Result.ok<IApplication>(200, application);
  }

  async findOne(condition: any): Promise<Result<IApplication>> {
    if (!condition)
      return Result.fail<IApplication>(
        400,
        "Please include at least one filter condition in your request."
      );
    const application = await this._applicationRepository.findByOne(condition);
    if (!application) {
      return Result.fail<IApplication>(404, "Client not found");
    }
    return Result.ok<IApplication>(200, application);
  }

  async findByCriteria(criteria: any): Promise<Result<IApplication>> {
    criteria.isActive = true;
    const application = await this._applicationRepository.findByCriteria(
      criteria
    );
    if (!application) {
      return Result.fail<IApplication>(404, `Client not found`);
    }
    return Result.ok<IApplication>(200, application);
  }

  async create(item: IApplication): Promise<Result<any>> {
    // TODO:: confirm validity of country id before saving
    const application = await this._applicationRepository.findByCriteria({
      clientId: item.clientId,
    });
    if (application)
      return Result.fail<IApplication>(
        409,
        `Client ${item.clientId} already exist`
      );
    item.isActive = false;
    item.audience.toLowerCase();
    item.redirectBaseUrl.toLowerCase();
    item.emailConfirmationRedirectUrl.toLowerCase();
    item.clientSecret = btoa(`${item.name}{item.clientId}`);
    const newApplication = await this._applicationRepository.create(item);
    return Result.ok<IApplication>(201, newApplication);
  }

  async update(id: string, item: IApplication): Promise<Result<IApplication>> {
    const application = await this._applicationRepository.findById(id);
    if (!application) return Result.fail<IApplication>(404, "Client not found");
    item.clientId = application.clientId;
    item.clientSecret = application.clientSecret;
    item.audience.toLowerCase();
    item.redirectBaseUrl.toLowerCase();
    item.emailConfirmationRedirectUrl.toLowerCase();
    const updateObj = await this._applicationRepository.update(
      application._id,
      item
    );
    return Result.ok<IApplication>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._applicationRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(ApplicationBusiness);
export = ApplicationBusiness;
