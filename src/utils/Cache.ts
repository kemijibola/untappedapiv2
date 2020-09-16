import mongoose, { Document } from "mongoose";
import redis, { ClientOpts } from "redis";
var RedisClustr = require("redis-clustr");
import util from "util";
import { AppConfig } from "../app/models/interfaces/custom/AppConfig";
const config: AppConfig = module.require("../config/keys");

declare module "mongoose" {
  interface Query<T> {
    cache(options: any): Query<T>;
    useCache: boolean;
    hashKey: string;
    collectionName: string;
  }
}

declare module "mongoose" {
  interface DocumentQuery<T, DocType> {
    cacheDocQuery(options: any): DocumentQuery<T, DocType>;
    cacheDocQueries(options: any): DocumentQuery<T[], DocType>;
  }
}

const cacheAddress = config.REDIS_URI;

const client: any = redis.createClient(cacheAddress);

client.hget = util.promisify(client.hget);

const exec: any = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options: any = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  this.collectionName = options.collectionName;
  return this;
};

mongoose.Query.prototype.cacheDocQuery = function (options: any = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  this.collectionName = options.collectionName;

  return this;
};

mongoose.Query.prototype.cacheDocQueries = function (options = {}) {
  const { collectionName } = options;
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  this.collectionName = collectionName;
  return this;
};

mongoose.Query.prototype.exec = async function (...args: any[]) {
  if (!this.useCache) {
    return exec.apply(this, args);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.collectionName,
    })
  );

  // See if we have a value for 'key' in redis
  // const cacheValue = await client.hget(this.hashKey, key);
  const cacheValue = await client.hget(this.hashKey, key);

  // If we do, return that
  if (cacheValue) {
    return JSON.parse(cacheValue);
  }

  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, args);

  client.hset(this.hashKey, key, JSON.stringify(result));

  return result;
};

// module.exports = {
//   clearHash(hashKey: string) {
//     client.del(JSON.stringify(hashKey));
//   }
// };
