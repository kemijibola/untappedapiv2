import mongoose from 'mongoose';
import { AppConfig } from '../app/models/interfaces/custom/AppConfig';
const config: AppConfig = module.require('./config/keys');
import bluebird from 'bluebird';
import { RedisClient } from 'redis';
const redis = bluebird.Promise.promisifyAll(require('redis'));

const cacheAddress = config.REDIS_HOST || '127.0.0.1';
const cachePort = config.REDIS_PORT || 6379;

let client: RedisClient = redis.createClient(cachePort, cacheAddress);
const Callback: string = '';

declare module 'mongoose' {
  interface Query<T> {
    cache(options: any): Query<T>;
    useCache: boolean;
    hashKey: string;
    collectionName: string;
  }
}

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');
  this.collectionName = options.collectionName;

  return this;
};

mongoose.Query.prototype.exec = async function(...args: any) {
  if (!this.useCache) {
    return exec.apply(this, args);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.collectionName
    })
  );

  // See if we have a value for 'key' in redis
  const cacheValue = await client.hget(this.hashKey, key);

  // If we do, return that
  if (cacheValue) {
    //const doc = JSON.parse(cacheValue);
    // return Array.isArray(doc)
    //   ? doc.map(d => new this.model(d))
    //   : new this.model(doc);
  }

  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, args);

  client.hset(this.hashKey, key, JSON.stringify(result));

  return result;
};

module.exports = {
  clearHash(hashKey: string) {
    client.del(JSON.stringify(hashKey));
  }
};

// const cacheAddress = config.REDIS_HOST || "127.0.0.1";
// const cachePort = config.REDIS_PORT || 6379;

// const client = redis.createClient(cachePort, cacheAddress);
// client.get = util.promisify(client.get);

// const exec: any = mongoose.Query.prototype.exec;

// mongoose.Query.prototype.cache = function cache(
//   this: Query<any>,
//   options: CacheOptions
// ) {
//   this.useCache = true;
//   this.collectionName = options.collectionName;
//   return this;
// };

// mongoose.Query.prototype.exec = function() {
//   if (!this.useCache) {
//     return exec.apply(this, arguments);
//   }

//   const key = JSON.stringify(
//     Object.assign({}, this.getQuery(), {
//       collection: this.collectionName
//     })
//   );

//   return exec.apply(this, arguments).then((result: any) => {
//     client.set(key, JSON.stringify(result));
//     return result;
//   });
// };
