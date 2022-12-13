import sockets from 'socket.io';
import type { Server } from 'http'

const SOCKET_CORS = {
  origin: true,
  methods: ['GET', 'POST'],
  credentials: true
}

class Socket extends sockets.Server {

  private static io: Socket;

  public constructor(httpServer: Server) {
    super(httpServer, {
      cors: SOCKET_CORS,
      allowEIO3: true
    });
  }

  public getInstance(httpServer?: Server): Socket {

    if (!Socket.io)
      Socket.io = new Socket(httpServer);

    return Socket.io;

  }
}

export default Socket;
