import type { Request, Response, NextFunction }  from 'express';
import { EHttpStatusCode, EStatus, EMessage, EErrorCode } from '../../core/enum'
import { Get, Post } from '../../core/decorator'
import type { IResponseTypes } from '../../core/types/response.type'
import { CompanyService } from './company.service'
import { Company } from './#schema/company.schema'
import { getEnumKeyByEnumValue } from '../../utils/index.util'

class CompanyController {
  private posts: any[] = [
    {
      name: 'Muchammad Ilham',
      division: 'System Development',
      title: 'Senior'
    }
  ];

  @Get('/')
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
          statusCode: EHttpStatusCode.INTERNAL_SERVER_ERROR,
          status: EStatus.FAILED,
          code: error.code,
          message: error.message,
          detail: error.detail
        } as IResponseTypes)
      }
    })
  }

  @Get('id/:id')
  public async getCompanyByID(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(async () => {
      try {
        const { id } = request.params
        const result = await CompanyService.getCompanyByID(parseInt(id, 10))
        response.json({
          detail: result
        })
      } catch (error: any) {
        next({
          statusCode: EHttpStatusCode.INTERNAL_SERVER_ERROR,
          status: EStatus.FAILED,
          code: error.code,
          message: error.message,
          detail: error.detail
        } as IResponseTypes)
      }
    })
  }
}

export default new CompanyController();
