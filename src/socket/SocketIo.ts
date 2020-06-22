// import * as http from "http";
// import * as WebSocket from "ws";
// import express, { Express } from "express";

// class WebSocketIoServer {
//   server: any;
//   wws: any;
//   constructor(app: Express) {
//     this.server = http.createServer(app);
//     const wss = new WebSocket.Server({ server: this.server });
//   }

//   listen(): socketIo.Server {
//     const server = createServer(this.app);
//     return socketIo(server);
//   }

//   static initialize() {
//     if (this.wws) {
//       return this.wws;
//     }

//   }
// }

// Object.seal(SocketIoServer);
// export = SocketIoServer;
