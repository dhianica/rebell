import * as express from 'express'
import { IAMQPInstance } from '../../core/instance'

class MessageController {
  public getAllMessages = async (
    req: express.Request,
    res: express.Response, 
    next: express.NextFunction
  ): Promise<void> => {
    try {
      const amqp = new IAMQPInstance()
      await amqp.send('logs', `${req.query.message}`, { durable: false, autoDelete: true })
      res.send({ status: '0000', message: 'OK' })
    } catch (err) {
      next(err)
    }
  };

}

export default new MessageController();
