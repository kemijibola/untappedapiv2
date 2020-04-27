import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";

export enum ChannelType {
  sms = "sms",
  web = "web",
  mobile = "mobile",
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
  shortcode: number;
  contestantCode: string;
  channelType: ChannelType;
  voteStatus: VoteStatus;
}
