"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var pusher_1 = __importDefault(require("pusher"));
var config = module.require("../../config/keys");
var PusherHelper = /** @class */ (function () {
    function PusherHelper() {
        this.pusher = new pusher_1.default({
            appId: config.PUSHER.app_id,
            key: config.PUSHER.key,
            secret: config.PUSHER.secret,
            cluster: config.PUSHER.cluster,
            useTLS: true,
        });
    }
    PusherHelper.init = function () {
        return new PusherHelper();
    };
    PusherHelper.prototype.publish = function (channel, event, data) {
        this.pusher.trigger(channel, event, data);
    };
    return PusherHelper;
}());
Object.seal(PusherHelper);
module.exports = PusherHelper;
//# sourceMappingURL=Pusher.js.map