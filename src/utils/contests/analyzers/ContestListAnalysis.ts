import { ContestAnalyzer } from "../ContestSummary";
import { IContest } from "../../../app/models/interfaces";
import { IContestList } from "../../../app/models/interfaces/custom/ContestList";
import { distanceInWords } from "date-fns";
import { ContestHelper } from "../Contest";

export class ContestListAnalysis implements ContestAnalyzer<IContestList[]> {
  async run(contests: IContest[]): Promise<IContestList[]> {
    const contestWithDistanceInWord: IContestList[] = contests.reduce(
      (acc: IContestList[], theItem: IContest) => {
        const result = distanceInWords(
          new Date(theItem.startDate),
          new Date(Date.now()),
          { includeSeconds: true }
        );
        acc.push({
          _id: theItem._id,
          title: theItem.title,
          entryCount: 0,
          viewCount: theItem.views,
          bannerImage: theItem.bannerImage,
          startDate: theItem.startDate,
        });
        return acc;
      },
      []
    );

    for (let item of contestWithDistanceInWord) {
      const contestHelper = ContestHelper.setUp();
      const entries = await contestHelper.fetchEntriesByCondition({
        contest: item._id,
      });
      item.entryCount = entries.length;
    }
    return contestWithDistanceInWord;
  }
}
