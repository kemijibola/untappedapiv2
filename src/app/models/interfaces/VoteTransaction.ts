import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";

export enum ChannelType {
  sms = "sms",
  online = "online",
}

export enum VoteStatus {
  valid = "valid",
  invalid = "invalid",
}

export interface VoteTransaction
  extends ITimeStamp,
    IAppSpec,
    mongoose.Document {
  channelId: string;
  phone: string;
  network: string;
  contestId: string;
  shortcode: number;
  contestantCode: string;
  channelType: ChannelType;
  voteStatus: VoteStatus;
}
