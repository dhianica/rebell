import { type Request, type Response, type NextFunction } from 'express';
import logger from './logs';
import { HttpStatusCode, Status, Message } from './enum'
import { getEnumKeyByEnumValue } from '../utils/index.util';
import { IResponseTypes } from './types/response.type'
/**
 * This core/middelware.ts reference from Express Middleware for create response handler
 *
 * FEATURES
 * add logger.debug for logging request endpoint, this run before endpoint called
 * 
 * TODO
 * Handling Global Response Handler Success or Failed 
*/

class Middleware {
  public async loggerMiddleware(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.debug(`Run ${request.path}` , {
      path: request.path,
      method: request.method,
      body: Object.keys(request.body).length !== 0 ? request.body : ''
    });
    next()
  }

  public async responseMiddleware(request: Request, response: Response, next: NextFunction): Promise<void>  {
    try {
      const oldJSON = response.json;
      response.json = (data: IResponseTypes): any => {
        if(data) {
          if(data.status !== Status.FAILED) {
            return oldJSON.call(response.status(data.statusCode), {
              status: data.status,
              message: data.message,
              detail: data.detail
            })
          } else {
            throw data
          }
        } else {
          throw data
        }
      } 
      next()
    } catch(err){
      console.log(err)
    }
  }

  public async errorMiddleware(error: any, request: Request, response: Response, next: NextFunction): Promise<void>  {
    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
      status: Status.FAILED,
      message: Message.NOT_HANDLED,
      detail: JSON.stringify(error)
    })
  }
}
export default new Middleware()
