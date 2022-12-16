import type { Request, Response, NextFunction }  from 'express';
import { getEnumKeyByEnumValue } from '../../../utils/index.util'
import { EHttpStatusCode, EStatus, EMessage } from '../../../core/enum'
import { Get, Post } from '../../../core/decorator'

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
      } catch (error: any) {
        console.log( typeof error === 'string' ? error : error.message )
        res.status(EHttpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: EMessage.NOT_HANDLED,
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
        res.status(EHttpStatusCode.OK).send({
          message: EStatus.SUCCESS
        })
      } catch (error: any) {
        console.log( typeof error === 'string' ? error : error.message )
        res.status(EHttpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: getEnumKeyByEnumValue(EHttpStatusCode, 'INTERNAL_SERVER_ERROR'),
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
