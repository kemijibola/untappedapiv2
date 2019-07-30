import { IIssueCategory } from '../models/interfaces';
import { IssueCategorySchema } from '../data/schema/IssueCategory';
import RepositoryBase from './base/RepositoryBase';

class IssueCategoryRepository extends RepositoryBase<IIssueCategory> {
  constructor() {
    super(IssueCategorySchema);
  }
}

Object.seal(IssueCategoryRepository);
export = IssueCategoryRepository;
