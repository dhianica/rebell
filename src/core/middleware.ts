import { type Request, type Response, type NextFunction } from 'express';
import logger from './logs';
import { EHttpStatusCode, ESuccessMessage, EStatus } from './enum'
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

  /**
   *
   * this is loggerMiddleware for logging request handlers
   *
   * @param request : express request
   * @param response  : express response
   * @param next : express next function
   */
  public async loggerMiddleware(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.debug(`Run ${request.path}`);
    logger.info(`Request ${request.path}\t\t${JSON.stringify({
      path: request.path,
      method: request.method,
      data: { ...request.body, ...request.query, ...request.params }
    })}`);
    next()
  }

  /**
   *
   * this is responseMiddleware for intercepting response handlers from controller
   * reference from https://stackoverflow.com/questions/60487871/express-middleware-to-configure-response
   *
   * @param request : express request
   * @param response  : express response
   * @param next : express next function
   */
  public async responseMiddleware(request: Request, response: Response, next: NextFunction): Promise<void>  {
    try {
      const oldJSON = response.json;
      response.json = (data: any = {
        statusCode: EHttpStatusCode.OK,
        status: EStatus.SUCCESS,
        message: ESuccessMessage.FETCH
      }): any => {
        data = {
          statusCode: EHttpStatusCode.OK,
          status: EStatus.SUCCESS,
          message: ESuccessMessage.FETCH,
          ...data
        }
        logger.info(`Response ${request.path}\t\t${JSON.stringify(data)}`)
        if (data && data.status === EStatus.FAILED)
          return oldJSON.call(response.status(data.statusCode), {
            status: data.status,
            message: data.message,
            errorCode: data.errorCode,
            detail: data.detail
          })
        else
          return oldJSON.call(response.status(data.statusCode), {
            status: data.status,
            message: data.message,
            detail: data.detail
          });

      }
      await next()
    } catch (error) {
      next(error)
    }
  }

  /**
   *
   * This is errorMiddleware for logging errors response from controller and next to responseMiddleware
   *
   * @param error : any
   * @param request : express request
   * @param response  : express response
   * @param next : express next function
   */
  public async errorMiddleware(error: any | '' | null | undefined, request: Request, response: Response, next: NextFunction): Promise<any>  {
    response.json(error)
  }
}
export default new Middleware()
