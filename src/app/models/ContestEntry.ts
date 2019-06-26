import { IContestEntry, IUser, IContest } from './interfaces';

class ContestEntryModel {
  private _contestEntryModel: IContestEntry;
  constructor(contestEntryModel: IContestEntry) {
    this._contestEntryModel = contestEntryModel;
  }

  get user(): IUser {
    return this._contestEntryModel.user;
  }
  get contest(): IContest {
    return this._contestEntryModel.contest;
  }
  get submissionPath(): string {
    return this._contestEntryModel.submissionPath;
  }
}

Object.seal(ContestEntryModel);
export = ContestEntryModel;
