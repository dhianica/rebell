/* eslint-disable max-classes-per-file */
import AMQPMessageBroker from './amqp'
import Socket from './socket-io'
import MSSQL from './db/mssql'

export class IAMQPInstance extends AMQPMessageBroker { }
export class ISocketInstance extends Socket { }
export class IMSSQLInstance extends MSSQL { }
