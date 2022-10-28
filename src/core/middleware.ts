import { type Request, type Response, type NextFunction } from 'express';
import logger from './logs';
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
    console.log(request.Message, 'try')
    response.status(200).json({message:'OK'})
  }
}


export default new Middleware()
