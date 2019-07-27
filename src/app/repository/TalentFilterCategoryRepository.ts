import { TalentFilterCategorySchema } from '../data/schema/TalentFilterCategory';
import RepositoryBase from './base/RepositoryBase';
import { ITalentFilterCategory } from '../models/interfaces/TalentFilterCategory';

class TalentFilterCategoryRepository extends RepositoryBase<
  ITalentFilterCategory
> {
  constructor() {
    super(TalentFilterCategorySchema);
  }
}

Object.seal(TalentFilterCategoryRepository);
export = TalentFilterCategoryRepository;
