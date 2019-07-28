import ServiceRepository from '../repository/ServiceRepository';
import IServiceBusiness = require('./interfaces/ServiceBusiness');
import { IService } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ServiceBusiness implements IServiceBusiness {
  private _serviceRepository: ServiceRepository;

  constructor() {
    this._serviceRepository = new ServiceRepository();
  }

  async fetch(condition: any): Promise<Result<IService[]>> {
    try {
      const services = await this._serviceRepository.fetch(condition);
      return Result.ok<IService[]>(200, services);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IService>> {
    try {
      const service = await this._serviceRepository.findById(id);
      if (!service)
        return Result.fail<IService>(404, `Service of Id ${id} not found`);
      else return Result.ok<IService>(200, service);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IService>> {
    try {
      const service = await this._serviceRepository.findByCriteria(criteria);
      if (!service) return Result.fail<IService>(404, `Service not found`);
      else return Result.ok<IService>(200, service);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IService): Promise<Result<IService>> {
    try {
      const newService = await this._serviceRepository.create(item);
      // TODO:: Create approval request
      return Result.ok<IService>(201, newService);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IService): Promise<Result<IService>> {
    try {
      const service = await this._serviceRepository.findById(id);
      if (!service)
        return Result.fail<IService>(
          404,
          `Could not update service.Service of Id ${id} not found`
        );
      const updateObj = await this._serviceRepository.update(service._id, item);
      return Result.ok<IService>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._serviceRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(ServiceBusiness);
export = ServiceBusiness;
