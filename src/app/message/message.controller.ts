import type { Request, Response, NextFunction }  from 'express';
import { EHttpStatusCode, EStatus, IAMQPInstance, Get } from 'rebell-core'

class MessageController {
  @Get('')
  public async getAllMessages  (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const amqp = new IAMQPInstance()
      await amqp.send('logs', `${req.query.message}`, { durable: false, autoDelete: true })
      res.status(EHttpStatusCode.OK).send({
        message: EStatus.SUCCESS
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new MessageController();
