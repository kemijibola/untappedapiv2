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

export interface IVoteResult {
  sn: number;
  id: string;
  competition_code: string;
  phone: string;
  network: string;
  shortcode: number;
  contestant_code: string;
  channel_type: string;
  status: string;
  vote_date: Date;
  status_reason?: string;
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
  keyword: string;
  reason?: string;
}
