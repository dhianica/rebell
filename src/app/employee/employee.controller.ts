import type { Request, Response, NextFunction }  from 'express';
import { EHttpStatusCode, EStatus, EErrorMessage } from '../../core/enum'
import { Get, Post, ValidateBody } from '../../core/decorator'
import type { IResponseTypes } from '../../core/type'
import { Employee } from './#schema/employee.schema'
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
        response.json()
      } catch (error: any) {
        next(error)
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
        statusCode: EHttpStatusCode.INTERNAL_SERVER_ERROR,
        status: EStatus.FAILED,
        message: EErrorMessage.NOT_HANDLED
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
