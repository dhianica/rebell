import { type Request, type Response, type NextFunction } from 'express';
import logger from './logs';
import { HttpStatusCode, Status, Message } from './enum'
import { IResponseTypes } from './types/response.type'
/**
 * This core/middelware.ts reference from Express Middleware for create response handler
 *
 * FEATURES
 * add logger.debug for logging request endpoint, this run before endpoint called
 * Handling Global Response Handler Success or Failed 
 * add responsMiddleware for intercepting response handlers from controller
 * add errorMiddleware for error handling response handlers from controller
*/

class Middleware {
  public async loggerMiddleware(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.debug(`Run ${request.path}\t\t${JSON.stringify({
      path: request.path,
      method: request.method,
      body: Object.keys(request.body).length !== 0 ? request.body : ''
    })}`);
    next()
  }

  public async responseMiddleware(request: Request, response: Response, next: NextFunction): Promise<void>  {
    try {
      const oldJSON = response.json;
      response.json = (data: IResponseTypes): any => {
        if(data && data.status === Status.FAILED) { response.json = oldJSON; } else { logger.info(`Response ${request.path}\t\t${JSON.stringify(data)}`) }
        return oldJSON.call(response.status(data.statusCode), {
          status: data.status,
          message: data.message,
          detail: JSON.stringify(data.detail)
        });
      } 
      await next()
    } catch(error) {
      next(error)
    }
  }

  public async errorMiddleware(error: any, request: Request, response: Response, next: NextFunction): Promise<any>  {
    logger.error(`Response ${request.path}\t\t${JSON.stringify(error)}`)
    response.json(error)
  }
}
export default new Middleware()
