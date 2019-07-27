import { Analyzer } from '../Helper/Summary';
import {
  IFilterCategory,
  FilterCategory,
  TalentFilterCategory
} from '../../../app/models/interfaces';
import { MatchData } from '../Helper/MatchData';

export class MostTapAnalysis implements Analyzer {
  run(talents: MatchData[]): TalentFilterCategory {
    let sortedCategory: TalentFilterCategory = {
      result: [],
      categoryType: FilterCategory.MostTaps
    };

    talents = talents.sort((a, b) => {
      return b.tapCount - a.tapCount;
    });
    for (let talent of talents) {
      const filtered: IFilterCategory = {
        userId: talent.user,
        stageName: talent.stageName,
        profileImage: talent.profileImagePath || '',
        shortBio: talent.shortBio
      };
      sortedCategory.result = [...sortedCategory.result, filtered];
    }
    return sortedCategory;
  }
}