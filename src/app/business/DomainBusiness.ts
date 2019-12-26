import DomainRepository from "../repository/DomainRepository";
import IDomainBusiness = require("./interfaces/DomainBusiness");
import { IDomain } from "../models/interfaces";
import { Result } from "../../utils/Result";

class DomainBusiness implements IDomainBusiness {
  private _domainRepository: DomainRepository;

  constructor() {
    this._domainRepository = new DomainRepository();
  }

  async fetch(condition: any): Promise<Result<IDomain[]>> {
    const domains = await this._domainRepository.fetch(condition);
    return Result.ok<IDomain[]>(200, domains);
  }

  async findById(id: string): Promise<Result<IDomain>> {
    if (!id) return Result.fail<IDomain>(400, "Bad request.");
    const domain = await this._domainRepository.findById(id);
    if (!domain)
      return Result.fail<IDomain>(404, `Domain of Id ${id} not found`);
    return Result.ok<IDomain>(200, domain);
  }

  async findOne(condition: any): Promise<Result<IDomain>> {
    if (!condition) return Result.fail<IDomain>(400, "Bad request.");
    const domain = await this._domainRepository.findByOne(condition);
    if (!domain) return Result.fail<IDomain>(404, `Domain not found`);
    return Result.ok<IDomain>(200, domain);
  }

  async findByCriteria(criteria: any): Promise<Result<IDomain>> {
    const domain = await this._domainRepository.findByCriteria(criteria);
    if (!domain) return Result.fail<IDomain>(404, `Domain not found`);
    return Result.ok<IDomain>(200, domain);
  }

  async create(item: IDomain): Promise<Result<IDomain>> {
    const newDomain = await this._domainRepository.create(item);
    return Result.ok<IDomain>(200, newDomain);
  }

  async update(id: string, item: IDomain): Promise<Result<IDomain>> {
    const domain = await this._domainRepository.findById(id);
    if (!domain)
      return Result.fail<IDomain>(
        404,
        `Could not update domain.Domain with Id ${id} not found`
      );
    const updateObj = await this._domainRepository.update(domain._id, item);
    return Result.ok<IDomain>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._domainRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(DomainBusiness);
export = DomainBusiness;
