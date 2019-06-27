import { IGig } from '../models/interfaces';
import GigSchema from '../data/schema/Gig';
import RepositoryBase from './base/RepositoryBase';

class GigRepository extends RepositoryBase<IGig> {
  constructor() {
    super(GigSchema);
  }
}

Object.seal(GigRepository);
export = GigRepository;
