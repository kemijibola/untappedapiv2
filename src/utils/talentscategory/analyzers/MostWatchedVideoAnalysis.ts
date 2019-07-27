import { Analyzer } from '../Helper/Summary';
import { MatchData } from '../Helper/MatchData';
import {
  TalentFilterCategory,
  FilterCategory,
  IVideo,
  IFilterCategory
} from '../../../app/models/interfaces';
import {
  fetchTalentVideos,
  TalentPortfolio,
  TalentMediaComment
} from '../TalentPortfolio';

export class MostWatchedVideoAnalysis implements Analyzer {
  run(talents: MatchData[]): TalentFilterCategory {
    let sortedCategory: TalentFilterCategory = {
      result: [],
      categoryType: FilterCategory.MostTaps
    };

    const talentsVideo = talents.reduce((acc: TalentPortfolio[], theItem) => {
      fetchTalentVideos(theItem._id).then((data: IVideo[]) => {
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
          count: video.videoPlayCount,
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
        profileImage: talentVideoComment.talent.profileImagePath || '',
        shortBio: talentVideoComment.talent.shortBio
      };
      sortedCategory.result = [...sortedCategory.result, filtered];
    }
    return sortedCategory;
  }
}
