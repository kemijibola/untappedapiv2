import { Merge } from './Merge';

export class ListMerger implements Merge {
  mergeList<I, J, K>(list1: I[], list2: J[]): K[] {
    let listMap1 = list1.reduce((theMap: any, theItem) => {
      if (theItem) theMap[theItem] = theItem;
      return theMap;
    }, {});
    let listMap2 = list2.reduce((theMap: any, theItem) => {
      if (theItem) theMap[theItem] = theItem;
      return theMap;
    }, {});
    return Object.assign(listMap1, listMap2);
  }
}
