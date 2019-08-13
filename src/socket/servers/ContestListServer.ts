import { AbstractServer } from './AbstractServer';
import { IContestList } from '../../app/models/interfaces/custom/ContestList';

export enum ContestListEvent {
  CONTESTLIST = 'contestlist'
}

export class ContestListServer extends AbstractServer<IContestList[]> {
  data: IContestList[];
  message = ContestListEvent.CONTESTLIST;
  constructor(param: IContestList[]) {
    super();
    this.data = param;
  }

  static emitContestList(data: IContestList[]): ContestListServer {
    return new ContestListServer(data);
  }
}

// const c = ContestListServer.emitContestList([]);
