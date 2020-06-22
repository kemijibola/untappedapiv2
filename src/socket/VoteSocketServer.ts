import { createServer, Server } from "http";
import { Express } from "express";
import socketIo from "socket.io";
import { VoteEvent } from "../app/models/interfaces/custom/AppConfig";
import VoteTransactionBusiness = require("../app/business/VoteTransactionBusiness");
import { VoteTransaction, ChannelType } from "../app/models/interfaces";

class VoteSocketServer {
  server: Server;
  io: SocketIO.Server;
  private readonly _voteBusiness: VoteTransactionBusiness;

  private constructor(app: Express) {
    this._voteBusiness = new VoteTransactionBusiness();
    this.server = createServer(app);
    this.io = socketIo(this.server);
    this.listen();
  } 

  static setUpWs(app: Express): VoteSocketServer {
    return new VoteSocketServer(app);
  }

  listen() {
    this.io.on("connection", (socket: SocketIO.Socket) => {
      socket.on(VoteEvent.GET_VOTE_COUNT, async (data: string) => {
        try {
          var voteCountObj = JSON.parse(data);
          var result = await this._voteBusiness.fetchContestantVoteCount(
            voteCountObj["contestId"],
            voteCountObj["contestantCode"]
          );
          this.io.emit(VoteEvent.USER_TOTAL_VOTE, JSON.stringify(result.data));
        } catch (e) {
          console.error(e.message);
        }
      });

      socket.on(VoteEvent.INITIAL_DATA, async (data: string) => {
        try {
          var voteCountObj = JSON.parse(data);
          var result = await this._voteBusiness.fetchContestantVoteCount(
            voteCountObj["contestId"],
            voteCountObj["contestantCode"]
          );
          this.io.emit(VoteEvent.GET_VOTES, JSON.stringify(result.data));
        } catch (e) {
          console.error(e.message);
        }
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  // broadcast(data: string): void {
  //   this.io.clients.forEach((client) => {
  //     client.send(data);
  //   });
  // }
}

Object.seal(VoteSocketServer);
export = VoteSocketServer;
