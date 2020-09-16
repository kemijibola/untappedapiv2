import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import {
  VoteTransaction,
  ChannelType,
  VoteStatus,
} from "../../models/interfaces";

const voteTransactionSchema: Schema = new Schema(
  {
    channelId: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    network: {
      type: String,
    },
    shortcode: {
      type: String,
    },
    contestId: {
      type: String,
    },
    contestantCode: {
      type: String,
      required: true,
    },
    channelType: {
      type: ChannelType,
      required: true,
    },
    voteStatus: {
      type: VoteStatus,
    },
    reason: {
      type: String,
    },
    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  },
  { timestamps: true }
);

export const VoteTransactionSchema = mongooseConnection.model<VoteTransaction>(
  "VoteTransaction",
  voteTransactionSchema
);
