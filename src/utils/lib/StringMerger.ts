import { Merger } from './Merger';

export class StringListMerger extends Merger<string[], string[]> {
  constructor(public params1: string[], public params2: string[]) {
    super();
  }

  get list1(): string[] {
    return this.params1;
  }

  get list2(): string[] {
    return this.params2;
  }
  mergeList(): string[] {
    const listMap1 = this.list1.reduce((theMap: any, theItem: string) => {
      if (!theMap[theItem]) theMap[theItem] = theItem;
      return theMap;
    }, {});
    const listMap2 = this.list2.reduce((theMap: any, theItem: string) => {
      if (!theMap[theItem]) theMap[theItem] = theItem;
      return theMap;
    }, {});

    const merged = Object.assign(listMap1, listMap2);
    console.log(merged);
    return Object.seal(Object.keys(merged));
  }
}
