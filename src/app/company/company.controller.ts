import type { Request, Response, NextFunction }  from 'express';
import { HttpStatusCode, Status, Message } from '../../core/enum'
import { Get, Post } from '../../core/decorator'
import type { IResponseTypes } from '../../core/types/response.type'
import { CompanyService } from './company.service'
import { Company } from './#schema/company.schema'

class CompanyController {
  private posts: any[] = [
    {
      name: 'Muchammad Ilham',
      division: 'System Development',
      title: 'Senior'
    }
  ];

  @Get()
  public async getAllCompanys(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(async () => {
      try {
        const result = await CompanyService.getAllCompanys()
        response.json({
          detail: result
        })
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

  @Post('')
  public createACompany(
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

export default new CompanyController();
