"use strict";
var mongoose = require('mongoose');
var redis = require('redis');
var util = require('util');
var keys = require('../config/settings');
var client = redis.createClient(keys.redis_host);
client.get = util.promisify(client.get);
var exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.cache = function (audience) {
    if (audience === void 0) { audience = ''; }
    this.useCache = true;
    this.domain = audience;
    return this;
};
mongoose.Query.prototype.exec = function () {
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }
    var key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));
    var cachedValue = yield client.get(key);
    if (cachedValue) {
        return JSON.parse(cachedValue);
    }
    var result = yield exec.apply(this, arguments);
    client.set(key, JSON.stringify(result));
    return result;
};
//# sourceMappingURL=Cache.js.map