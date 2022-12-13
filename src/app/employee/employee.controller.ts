import type { Request, Response, NextFunction }  from 'express';
import { HttpStatusCode, Status, Message } from '../../core/enum'
import { Get, Post, ValidateBody } from '../../core/decorator'
import type { IResponseTypes } from '../../core/types/response.type'
import { Employee } from './#schema/employee.schema'
import { IMSSQLInstance } from '../../core/lib/instance'
class EmployeeController {
  private posts: any[] = [
    {
      name: 'Muchammad Ilham',
      division: 'System Development',
      title: 'Senior'
    }
  ];

  @Get()
  public async getAllEmployees(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(() => {
      try {
        const mssql = new IMSSQLInstance('employee')
        response.json()
      } catch (error: any) {
        next({
          statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
          status: Status.FAILED,
          message: Message.NOT_HANDLED,
          detail: error.message
        } as IResponseTypes)
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
      next({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        message: Message.NOT_HANDLED
      } as IResponseTypes)
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
