import { IContestEntry } from '../models/interfaces';
import { ContestEntrySchema } from '../data/schema/ContestEntry';
import RepositoryBase from './base/RepositoryBase';

class ContestEntryRepository extends RepositoryBase<IContestEntry> {
  constructor() {
    super(ContestEntrySchema);
  }
}

Object.seal(ContestEntryRepository);
export = ContestEntryRepository;
