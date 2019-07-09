type CacheOptions = { collectionName: string };

declare module 'mongoose' {
  interface Query<T> {
    cache(options: CacheOptions): Query<T>;
    useCache: boolean;
    hashKey: string;
    collectionName: string;
  }
}
