import { OutputTarget } from '../Helper/Summary';
import {
  FilterCategory,
  ITalentFilterCategory
} from '../../../app/models/interfaces';
import TalentFilterCategoryBusiness from '../../../app/business/TalentFilterCategoryBusiness';

export class DatabaseReport implements OutputTarget {
  async process(report: FilterCategory): Promise<void> {
    let item: ITalentFilterCategory = Object.assign({});
    const talentFilterCategoryBusiness = new TalentFilterCategoryBusiness();
    item = Object.assign(item, report);
    await talentFilterCategoryBusiness.create(item);
  }
}
