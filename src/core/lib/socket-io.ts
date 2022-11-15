import sockets from 'socket.io';
import type { Server } from 'http'

const SOCKET_CORS = {
  origin: '*',
  methods: ['GET', 'POST']
}

class Socket extends sockets.Server {

  private static io: Socket;

  public constructor(httpServer: Server) {
    super(httpServer, {
      cors: SOCKET_CORS
    });
  }

  public static getInstance(httpServer?: Server): Socket {

    if (!Socket.io)
      Socket.io = new Socket(httpServer);

    return Socket.io;

  }
}

export default Socket;
