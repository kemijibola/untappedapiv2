import GigRepository from "../repository/GigRepository";
import IGigBusiness = require("./interfaces/GigBusiness");
import { IGig } from "../models/interfaces";
import { Result } from "../../utils/Result";

class GigBusiness implements IGigBusiness {
  private _gigRepository: GigRepository;

  constructor() {
    this._gigRepository = new GigRepository();
  }

  async fetch(condition: any): Promise<Result<IGig[]>> {
    const gigs = await this._gigRepository.fetch(condition);
    return Result.ok<IGig[]>(200, gigs);
  }

  async findById(id: string): Promise<Result<IGig>> {
    if (!id) return Result.fail<IGig>(400, "Bad request.");
    const gig = await this._gigRepository.findById(id);
    if (!gig) return Result.fail<IGig>(404, `Gig of Id ${id} not found`);
    return Result.ok<IGig>(200, gig);
  }

  async findOne(condition: any): Promise<Result<IGig>> {
    if (!condition) return Result.fail<IGig>(400, "Bad request.");
    const gig = await this._gigRepository.findByOne(condition);
    if (!gig) return Result.fail<IGig>(404, `Gig not found`);
    return Result.ok<IGig>(200, gig);
  }

  async findByCriteria(criteria: any): Promise<Result<IGig>> {
    const gig = await this._gigRepository.findByCriteria(criteria);
    if (!gig) return Result.fail<IGig>(404, `Gig not found`);
    return Result.ok<IGig>(200, gig);
  }

  async create(item: IGig): Promise<Result<IGig>> {
    const newGig = await this._gigRepository.create(item);
    return Result.ok<IGig>(201, newGig);
  }

  async update(id: string, item: IGig): Promise<Result<IGig>> {
    const gig = await this._gigRepository.findById(id);
    if (!gig)
      return Result.fail<IGig>(
        404,
        `Could not update gig.Gig with Id ${id} not found`
      );
    const updateObj = await this._gigRepository.update(gig._id, item);
    return Result.ok<IGig>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._gigRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(GigBusiness);
export = GigBusiness;
