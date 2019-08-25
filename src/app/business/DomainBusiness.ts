import DomainRepository from '../repository/DomainRepository';
import IDomainBusiness = require('./interfaces/DomainBusiness');
import { IDomain } from '../models/interfaces';
import { Result } from '../../utils/Result';

class DomainBusiness implements IDomainBusiness {
  private _domainRepository: DomainRepository;

  constructor() {
    this._domainRepository = new DomainRepository();
  }

  async fetch(condition: any): Promise<Result<IDomain[]>> {
    try {
      const domains = await this._domainRepository.fetch(condition);
      return Result.ok<IDomain[]>(200, domains);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IDomain>> {
    try {
      if (!id) return Result.fail<IDomain>(400, 'Bad request.');
      const domain = await this._domainRepository.findById(id);
      if (!domain)
        return Result.fail<IDomain>(404, `Domain of Id ${id} not found`);
      else return Result.ok<IDomain>(200, domain);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IDomain>> {
    try {
      if (!condition) return Result.fail<IDomain>(400, 'Bad request.');
      const domain = await this._domainRepository.findByOne(condition);
      if (!domain) return Result.fail<IDomain>(404, `Domain not found`);
      else return Result.ok<IDomain>(200, domain);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IDomain>> {
    try {
      const domain = await this._domainRepository.findByCriteria(criteria);
      if (!domain) return Result.fail<IDomain>(404, `Domain not found`);
      else return Result.ok<IDomain>(200, domain);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IDomain): Promise<Result<IDomain>> {
    try {
      const newDomain = await this._domainRepository.create(item);
      return Result.ok<IDomain>(200, newDomain);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IDomain): Promise<Result<IDomain>> {
    try {
      const domain = await this._domainRepository.findById(id);
      if (!domain)
        return Result.fail<IDomain>(
          404,
          `Could not update domain.Domain with Id ${id} not found`
        );
      const updateObj = await this._domainRepository.update(domain._id, item);
      return Result.ok<IDomain>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._domainRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(DomainBusiness);
export = DomainBusiness;
