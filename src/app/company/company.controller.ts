import type { Request, Response, NextFunction }  from 'express';
import { EErrorMessage, EErrorCode, EApp, ESuccessMessage, Get, Post, ValidateBody, customError } from 'rebell-core'
import { CompanyService } from './company.service'
import { generateCode, getMethodName, isNumber } from 'rebell-utils'
import { Company as CompanySchema } from './#schema/company.schema'

class CompanyController {

  @Get('/')
  public async getAllCompanies(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(async () => {
      try {
        const result = await CompanyService.get(request)
        response.json({
          detail: result
        })
      } catch (error: any) {
        next(error)
      }
    })
  }

  @Get(':id')
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

        const result = await CompanyService.getByID(request, parseInt(id, 10))
        response.json({
          message: result.message,
          detail: result.data
        })
      } catch (error: any) {
        next(error)
      }
    })
  }

  @Post('/')
  public async insertCompany(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(async () => {
      try {
        const result = await CompanyService.insert(request.body)
        response.json({ message: ESuccessMessage.INSERTED, detail: result })
      } catch (error: any) {
        next(error)
      }
    })
  }
}

export default new CompanyController();
