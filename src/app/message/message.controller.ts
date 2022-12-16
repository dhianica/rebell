import type { Request, Response, NextFunction }  from 'express';
import { IAMQPInstance } from '../../core/lib/instance'
import { EHttpStatusCode, EStatus } from '../../core/enum'
import { Get } from '../../core/decorator'

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
