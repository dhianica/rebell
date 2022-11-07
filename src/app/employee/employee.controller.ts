import type { Request, Response, NextFunction }  from 'express';
import { getEnumKeyByEnumValue } from '../../utils/index.util'
import { HttpStatusCode, Status, Message } from '../../core/enum'
import { Get, Post } from '../../core/decorator/handler.decorator'
import type { IResponseTypes } from '../../core/types/response.type'

class EmployeeController {
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
        const result: IResponseTypes = {
          statusCode: HttpStatusCode.OK,
          status: Status.SUCCESS,
          message: Message.FETCH 
        }
        res.json(result)
      } catch (error) {
        const result: IResponseTypes = {
          statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
          status: Status.FAILED,
          message: Message.NOT_HANDLED,
          detail: error.message
        }
        res.json(result)
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
      const result: IResponseTypes = {
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        message: Message.NOT_HANDLED
      }
      next(result)
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
  };
}

export default new EmployeeController();
