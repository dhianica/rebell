import type { Request, Response, NextFunction }  from 'express';
import { HttpStatusCode, Status, Message } from '../../core/enum'
import { Get, Post, ValidateQuery } from '../../core/decorator'
import type { IResponseTypes } from '../../core/types/response.type'
import { Schema } from './#schema/employee.schema'
class EmployeeController {
  private posts: any[] = [
    {
      name: 'Muchammad Ilham',
      division: 'System Development',
      title: 'Senior'
    }
  ];

  @Get()
  @ValidateQuery(Schema)
  public async getAllEmployees(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(() => {
      try {
        const result: IResponseTypes = {
          statusCode: HttpStatusCode.OK,
          status: Status.SUCCESS,
          message: Message.FETCH
        }
        response.json(result)
      } catch (error) {
        const result: IResponseTypes = {
          statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
          status: Status.FAILED,
          message: Message.NOT_HANDLED,
          detail: error.message
        }
        next(result)
      }
    })
  }

  @Get()
  public async getAllEmployees1 (
    request: Request,
    response: Response,
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
    request: Request,
    response: Response
  ): Promise<void> {
    return new Promise<void>(() => {
      const post: any = request.body;
      this.posts.push(post);
      response.send(post);
    })
  }
}

export default new EmployeeController();
