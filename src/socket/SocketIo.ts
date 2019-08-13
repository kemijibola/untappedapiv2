import express, { Express } from 'express';
import { createServer, Server } from 'http';
import socketIo from 'socket.io';

export class SocketIo {
  private static instance: socketIo.Server;
  private static server: Server;

  constructor() {
    // SocketIo.getInstance;
  }
  static setUpApp(app: Express) {
    this.server = createServer(app);
  }

  static get getInstance(): socketIo.Server {
    if (!SocketIo.instance) {
      SocketIo.instance = socketIo(this.server);
    }
    console.log(this.instance);
    return SocketIo.instance;
  }
}
