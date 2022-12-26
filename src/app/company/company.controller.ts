import type { Request, Response, NextFunction }  from 'express';
import { EErrorMessage, EErrorCode, EApp } from '../../core/enum'
import { Get } from '../../core/decorator'
import { CompanyService } from './company.service'
import { generateCode, getMethodName, isNumber } from '../../utils/index.util'
import { customError } from '../../core/error';

class CompanyController {

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
        next(error)
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
        if (!isNumber(id))
          throw customError({
            message: EErrorMessage.INVALID_DATA,
            errorPath:`${EErrorCode.APP}-${EApp.APP_CONTROLLER}-${getMethodName(new Error())}`,
            errorCode:`${EErrorCode.APP}-${EApp.APP_CONTROLLER}-${generateCode(4)}`
          })

        const result = await CompanyService.getCompanyByID(parseInt(id, 10))
        response.json({
          detail: result
        })
      } catch (error: any) {
        next(error)
      }
    })
  }
}

export default new CompanyController();
