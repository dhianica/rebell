import * as amqp from 'amqplib';
import * as _ from 'lodash';
import { ErrorMessage } from '../../core/enum'
/**
 * Broker for async messaging
 */
class AMQPMessageBroker {
  public queues: Array<any> = [];
  public connection: amqp.Connection | undefined;
  public channel: amqp.Channel | undefined;

  /**
   * Initialize connection to rabbitMQ
   */
  public async init(): Promise<AMQPMessageBroker> {
    if (!this.connection && !this.channel) {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
      this.channel = await this.connection.createChannel();
    }
    return this;
  }
  /**
   * Send message to queue
   * @param {String} queue Queue name
   * @param {Object} msg Message as Buffer
   */
  public async send(queue?: string | undefined, msg?: string | undefined, options?: amqp.Options.AssertQueue): Promise<void> {
    if (!this.connection && !this.channel)
      await this.init();


    if (!queue)  throw new Error(`${ErrorMessage.NOT_DECLARED} the Queue`);
    if (!msg) msg = '';
    if (!options) options = { durable: true }
    await this.channel?.assertQueue(queue, options);
    this.channel?.sendToQueue(queue, Buffer.from(msg, 'utf-8'));
  }

  /**
   * @param {String} queue Queue name
   * @param {Function} handler Handler that will be invoked with given message and acknowledge function (msg, ack)
   */
  public async subscribe(queue?: string | any, handler?: any): Promise<void> {
    if (!this.connection && !this.channel)
      await this.init();


    if (!queue)  throw new Error(`${ErrorMessage.NOT_DECLARED} the Queue`);
    if (this.queues[queue]) {
      const existingHandler = _.find(this.queues[queue], (h) => h === handler);
      if (existingHandler)
        return await this.unsubscribe(queue, existingHandler);

      (this.queues[queue] as unknown as any[]).push(handler);
      return await this.unsubscribe(queue, handler);
    }

    await this.channel?.assertQueue(queue, { durable: true });
    (this.queues[queue] as any[]) = [handler];
    this.channel?.consume(
      queue,
      async (msg: any): Promise<void> => {
        const ack = _.once(() => this.channel?.ack(msg));
        this.queues[queue].forEach((h: any) => h(msg, ack));
      }
    );
    return await this.unsubscribe(queue, handler);
  }

  public async unsubscribe(queue?: string | any, handler?: any): Promise<void> {
    if (!queue)  throw new Error(`${ErrorMessage.NOT_DECLARED} the Queue`);
    _.pull((this.queues[queue] as any[]), handler);
  }
}

export default AMQPMessageBroker;
