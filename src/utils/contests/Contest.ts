import ContestEntryBusiness from '../../app/business/ContestEntryBusiness';
import { IContestEntry } from '../../app/models/interfaces';

export class ContestHelper {
  static setUp(): ContestHelper {
    return new ContestHelper();
  }

  async fetchEntriesByCondition(condition: any): Promise<IContestEntry[]> {
    let entries: IContestEntry[] = [];
    const contestEntryBusiness = new ContestEntryBusiness();
    const contestEntries = await contestEntryBusiness.fetch(condition);
    if (contestEntries.data) entries = [...contestEntries.data];
    return entries;
  }
}
