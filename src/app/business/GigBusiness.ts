import GigRepository from '../repository/GigRepository';
import IGigBusiness = require('./interfaces/GigBusiness');
import { IGig } from '../models/interfaces';
import { Result } from '../../utils/Result';

class GigBusiness implements IGigBusiness {
  private _gigRepository: GigRepository;

  constructor() {
    this._gigRepository = new GigRepository();
  }

  async fetch(): Promise<Result<IGig>> {
    try {
      const gigs = await this._gigRepository.fetch();
      return Result.ok<IGig>(200, gigs);
    } catch (err) {
      return Result.fail<IGig>(500, `Internal server error occured. ${err}`);
    }
  }

  async findById(id: string): Promise<Result<IGig>> {
    try {
      const gig = await this._gigRepository.findById(id);
      if (!gig) return Result.fail<IGig>(404, `Gig of Id ${id} not found`);
      else return Result.ok<IGig>(200, gig);
    } catch (err) {
      return Result.fail<IGig>(500, `Internal server error occured. ${err}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IGig>> {
    try {
      const gig = await this._gigRepository.findByCriteria(criteria);
      if (!gig) return Result.fail<IGig>(404, `Gig not found`);
      else return Result.ok<IGig>(200, gig);
    } catch (err) {
      return Result.fail<IGig>(500, `Internal server error occured. ${err}`);
    }
  }

  async create(item: IGig): Promise<Result<IGig>> {
    try {
      const newGig = await this._gigRepository.create(item);
      return Result.ok<IGig>(201, newGig);
    } catch (err) {
      return Result.fail<IGig>(500, `Internal server error occured. ${err}`);
    }
  }

  async update(id: string, item: IGig): Promise<Result<IGig>> {
    try {
      const gig = await this._gigRepository.findById(id);
      if (!gig)
        return Result.fail<IGig>(
          404,
          `Could not update approval.Approval of Id ${id} not found`
        );
      const updateObj = await this._gigRepository.update(gig._id, item);
      return Result.ok<IGig>(200, updateObj);
    } catch (err) {
      return Result.fail<IGig>(500, `Internal server error occured. ${err}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._gigRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(GigBusiness);
export = GigBusiness;
