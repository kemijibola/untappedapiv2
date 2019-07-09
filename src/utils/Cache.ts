/// <reference path='../main.d.ts' />
import mongoose, { Query } from 'mongoose';
import redis from 'redis';
const util = require('util');
import { AppConfig } from '../app/models/interfaces/custom/AppConfig';
const config: AppConfig = module.require('./config/keys');

const cacheAddress = config.REDIS_HOST || "127.0.0.1";
const cachePort = config.REDIS_PORT || 6379;

const client = redis.createClient(cachePort, cacheAddress);
client.get = util.promisify(client.get);

const exec: any = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function cache(
  this: Query<any>,
  options: CacheOptions
) {
  this.useCache = true;
  this.collectionName = options.collectionName;
  return this;
};

mongoose.Query.prototype.exec = function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.collectionName
    })
  );

  return exec.apply(this, arguments).then((result: any) => {
    client.set(key, JSON.stringify(result));
    return result;
  });
};
