import ServiceRepository from "../repository/ServiceRepository";
import IServiceBusiness = require("./interfaces/ServiceBusiness");
import { IService } from "../models/interfaces";
import { Result } from "../../utils/Result";

class ServiceBusiness implements IServiceBusiness {
  private _serviceRepository: ServiceRepository;

  constructor() {
    this._serviceRepository = new ServiceRepository();
  }

  async fetch(condition: any): Promise<Result<IService[]>> {
    const services = await this._serviceRepository.fetch(condition);
    return Result.ok<IService[]>(200, services);
  }

  async findById(id: string): Promise<Result<IService>> {
    if (!id) return Result.fail<IService>(400, "Bad request");
    const service = await this._serviceRepository.findById(id);
    if (!service)
      return Result.fail<IService>(404, `Service of Id ${id} not found`);
    return Result.ok<IService>(200, service);
  }

  async findOne(condition: any): Promise<Result<IService>> {
    if (!condition) return Result.fail<IService>(400, "Bad request");
    const service = await this._serviceRepository.findByOne(condition);
    if (!service) return Result.fail<IService>(404, "Service not found");
    return Result.ok<IService>(200, service);
  }

  async findByCriteria(criteria: any): Promise<Result<IService>> {
    const service = await this._serviceRepository.findByCriteria(criteria);
    if (!service) return Result.fail<IService>(404, "Service not found");
    return Result.ok<IService>(200, service);
  }

  async create(item: IService): Promise<Result<IService>> {
    const service = await this._serviceRepository.findByCriteria({
      name: item.name,
    });
    if (service === null) {
      item.active = false;
      const newService = await this._serviceRepository.create(item);
      // TODO:: create approval request here
      return Result.ok<IService>(201, newService);
    }
    return Result.fail<IService>(
      400,
      `Service with name ${service.name} exists`
    );
  }

  async update(id: string, item: IService): Promise<Result<IService>> {
    const service = await this._serviceRepository.findById(id);
    if (!service)
      return Result.fail<IService>(
        404,
        `Could not update user type.Service with Id ${id} not found`
      );
    const updateObj = await this._serviceRepository.update(service._id, item);
    return Result.ok<IService>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._serviceRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(ServiceBusiness);
export = ServiceBusiness;
