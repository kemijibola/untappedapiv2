import { Analyzer } from '../Helper/Summary';
import { MatchData } from '../Helper/MatchData';
import {
  FilterCategory,
  IVideo,
  IFilterCategory,
  ReportType
} from '../../../app/models/interfaces';
import {
  ITalentPortfolio,
  TalentMediaComment,
  TalentPortfolio
} from '../TalentPortfolio';

export class MostWatchedVideoAnalysis implements Analyzer {
  run(talents: MatchData[]): FilterCategory {
    let sortedCategory: FilterCategory = {
      result: [],
      categoryType: ReportType.MostWatchedVideos
    };

    const talentsVideo = talents.reduce((acc: ITalentPortfolio[], theItem) => {
      const talentPortfolio = TalentPortfolio.setUp(theItem._id);
      talentPortfolio.fetchTalentVideos().then((data: IVideo[]) => {
        acc.push({
          medias: data,
          talent: theItem
        });
      });
      return acc;
    }, []);

    // fetch talent's video watch
    let talentsVideoComment: TalentMediaComment[] = [];
    for (let talentVideo of talentsVideo) {
      for (let video of talentVideo.medias) {
        talentsVideoComment.push({
          count: video.watchCount,
          talent: talentVideo.talent
        });
      }
    }

    talentsVideoComment = talentsVideoComment.sort((a, b) => {
      return b.count - a.count;
    });

    for (let talentVideoComment of talentsVideoComment) {
      const filtered: IFilterCategory = {
        userId: talentVideoComment.talent._id,
        stageName: talentVideoComment.talent.stageName,
        // profileImage: talentVideoComment.talent.profileImagePath || '',
        profileImage: '',
        shortBio: talentVideoComment.talent.shortBio
      };
      sortedCategory.result = [...sortedCategory.result, filtered];
    }
    return sortedCategory;
  }
}
