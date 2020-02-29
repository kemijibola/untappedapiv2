"use strict";
// import { Analyzer } from "../Helper/Summary";
// import { MatchData } from "../Helper/MatchData";
// import {
//   FilterCategory,
//   IVideo,
//   IFilterCategory,
//   ReportType
// } from "../../../app/models/interfaces";
// import {
//   ITalentPortfolio,
//   TalentMediaComment,
//   TalentPortfolio
// } from "../TalentPortfolio";
// export class MostWatchedVideoAnalysis implements Analyzer {
//   run(talents: MatchData[]): FilterCategory {
//     let sortedCategory: FilterCategory = {
//       result: [],
//       categoryType: ReportType.MostWatchedVideos
//     };
//     const talentsVideo = talents.reduce((acc: ITalentPortfolio[], theItem) => {
//       const talentPortfolio = TalentPortfolio.setUp(theItem._id);
//       // talentPortfolio.fetchTalentVideos().then((data: IVideo[]) => {
//       //   acc.push({
//       //     medias: data,
//       //     profile: theItem
//       //   });
//       // });
//       return acc;
//     }, []);
//     // fetch talent's video watch
//     let talentsVideoComment: TalentMediaComment[] = [];
//     for (let talentVideo of talentsVideo) {
//       for (let video of talentVideo.medias) {
//         talentsVideoComment.push({
//           count: video.activityCount,
//           profile: talentVideo.profile
//         });
//       }
//     }
//     talentsVideoComment = talentsVideoComment.sort((a, b) => {
//       return b.count - a.count;
//     });
//     for (let talentVideoComment of talentsVideoComment) {
//       const filtered: IFilterCategory = {
//         userId: talentVideoComment.profile._id,
//         name: talentVideoComment.profile.name || "",
//         // profileImage: talentVideoComment.talent.profileImagePath || '',
//         profileImage: "",
//         shortBio: talentVideoComment.profile.shortBio || ""
//       };
//       sortedCategory.result = [...sortedCategory.result, filtered];
//     }
//     return sortedCategory;
//   }
// }
//# sourceMappingURL=MostWatchedVideoAnalysis.js.map