import { IPrizeType } from '../models/interfaces';
import { PrizeTypeSchema } from '../data/schema/PrizeType';
import RepositoryBase from './base/RepositoryBase';

class PrizeTypeRepository extends RepositoryBase<IPrizeType> {
  constructor() {
    super(PrizeTypeSchema);
  }
}

Object.seal(PrizeTypeRepository);
export = PrizeTypeRepository;
