/* eslint-disable max-len */
import * as http from 'http';
import dayjs from 'dayjs';
import dotenv from 'dotenv'

import App from '../index';
import type { IConfiguration, ISocketClient } from 'rebell-core';
import { Configuration, EFormat, EDatabase, ISocketInstance } from 'rebell-core';
import { getEnumKeyByEnumValue } from 'rebell-utils'
import { Logger } from 'rebell-core';

dotenv.config();

const server = http.createServer(App);

const normalizePort = (val: number | string): number | string | boolean => {
  const normolizedPort = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(normolizedPort))
    return val;

  if (normolizedPort >= 0)
    return normolizedPort;

  return false;
};

const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);

const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen')  throw error;
  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      Logger.error(`${bind} requires elevated privileges`);
      throw error;
    case 'EADDRINUSE':
      Logger.error(`${bind} is already in use`);
      throw error;
    default:
      throw error;
  }
};

const onListening = (): void => {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr?.port}`;
  Logger.info(`Listening on ${bind}`);
};

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

const io = new ISocketInstance(server)


const clients = [];

io.sockets.on('connection', (socket) => {
  socket.on('storeClientInfo', (data) => {
    const clientInfo: ISocketClient = {
      customId:  data.customId,
      clientId:  socket.id,
      connectTime:  dayjs().format(EFormat.DateString)
    }
    clients.push(clientInfo)
    App.set('socketClients', clients)
  });
  socket.on('connected', (data) => {
    console.log(dayjs().format(EFormat.DateString), `--> Connected from ${data.customId}`)
  })

  socket.on('disconnect', (data) => {
    const clientDisconnect = clients.find((x) => x.clientId === socket.id)
    console.log(dayjs().format(EFormat.DateString), `--> Disonnected from ${clientDisconnect.customId}`)
  })
});
// server
io.sockets.on('error', () => {
  console.log(dayjs().format(EFormat.DateString), `--> Error Socket Server`)
});
