import type { Request, Response, NextFunction }  from 'express';
import { customError } from '../../core/error';
import { EErrorMessage, EErrorCode, EApp, ESuccessMessage } from '../../core/enum'
import { generateCode, getMethodName, isNumber } from '../../utils/index.util'
import { Get, Post } from '../../core/decorator'

class UserController {

  private User = [{
    User_ID: 1,
    User_Name: 'User 1'
  }, {
    User_ID: 2,
    User_Name: 'User 2'
  }]

  @Get('/')
  public async getAllUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(async () => {
      try {
        response.json({
          detail: this.User
        })
      } catch (error: any) {
        next(error)
      }
    })
  }

  @Get(':id')
  public async getUserByID(
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

        const result = this.User.find(x => x.User_ID === parseInt(id, 10))
        response.json({
          message: ESuccessMessage.FOUND,
          detail: result
        })
      } catch (error: any) {
        next(error)
      }
    })
  }
}

export default new UserController();
