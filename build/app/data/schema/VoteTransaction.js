"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var voteTransactionSchema = new mongoose_1.Schema({
    channelId: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    network: {
        type: String,
        required: true,
    },
    shortcode: {
        type: String,
    },
    contestantCode: {
        type: String,
        required: true,
    },
    channelType: {
        type: interfaces_1.ChannelType,
        required: true,
    },
    voteStatus: {
        type: interfaces_1.VoteStatus,
    },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Application",
    },
}, { timestamps: true });
exports.VoteTransactionSchema = mongooseConnection.model("VoteTransaction", voteTransactionSchema);
//# sourceMappingURL=VoteTransaction.js.map