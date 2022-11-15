/* eslint-disable max-classes-per-file */
import AMQPMessageBroker from './amqp'
import Socket from './socket-io'

export class IAMQPInstance extends AMQPMessageBroker { }
export class ISocketInstance extends Socket { }
