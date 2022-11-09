import type { Request, Response, NextFunction }  from 'express';
import { getEnumKeyByEnumValue } from '../../../utils/index.util'
import { HttpStatusCode, Status, Message } from '../../../core/enum'
import { Get, Post } from '../../../core/decorator/handler.decorator'

class DetailController {
  private posts: any[] = [
    {
      name: 'Muchammad Ilham',
      division: 'System Development',
      title: 'Senior'
    }
  ];

  @Get()
  public getAllEmployees(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(() => {
      try {
        throw new Error('Error getting all employees')
      } catch (error) {
        console.log( typeof error === 'string' ? error : error.message )
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: Message.NOT_HANDLED,
          detail: error
        })
      }
    })
  }

  @Get()
  public getAllEmployees1 (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return new Promise<void>(() => {
      try {
        res.status(HttpStatusCode.OK).send({
          message: Status.SUCCESS
        })
      } catch (error) {
        console.log( typeof error === 'string' ? error : error.message )
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: getEnumKeyByEnumValue(HttpStatusCode, 'INTERNAL_SERVER_ERROR'),
          detail: error
        })
      }
    })
  }

  @Post('')
  public createAEmployee(
    req: Request,
    res: Response
  ): Promise<void> {
    return new Promise<void>(() => {
      const post: any = req.body;
      this.posts.push(post);
      res.send(post);
    })
  }
}

export default new DetailController();
