export abstract class Merger<T, K> {
  abstract list1: T;
  abstract list2: K;
  abstract mergeList(): any;

  // merge(): void {
  //   const { list1, list2 } = this;
  //   this.mergeList(list1, list2);
  // }
}
