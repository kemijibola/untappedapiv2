export abstract class Merger<T, K> {
  abstract list1: T;
  abstract list2: K;
  abstract mergeList(): any;
}
