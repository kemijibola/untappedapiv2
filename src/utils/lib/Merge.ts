export interface Merge {
  mergeList<I, J, K>(list1: I[], list2: J[]): K[];
}

export class Merger {
  constructor(public merge: Merge) {}

  mergeList<T, K>(param1: T[], param2: K[]): void {
    this.merge.mergeList(param1, param2);
  }
}
