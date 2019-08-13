import { SocketIo } from '../SocketIo';

export enum ServerEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}

export abstract class AbstractServer<T> {
  abstract message: string;
  abstract data: T;

  constructor() {
    this.emitData();
  }

  emitData() {
    const io = SocketIo.getInstance;
    io.on(ServerEvent.CONNECT, (socket: any) => {
      socket.on(this.message, () => {
        console.log('[server](message): %s', JSON.stringify(this.data));
        io.emit('message', this.data);
      });

      socket.on(ServerEvent.DISCONNECT, () => {
        console.log('Client disconnected');
      });
    });
  }
}
