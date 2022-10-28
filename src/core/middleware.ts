import { type Request, type Response, type NextFunction, application } from 'express';
import { HttpStatusCode, SuccessMessage } from '../utils/index.util';
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
    logger.debug({
      path: request.path,
      method: request.method,
      body: Object.keys(request.body).length !== 0 ? request.body : ''
    });
    try { 
      await next();
    } catch (err) {
      console.log(err.message)
    }
  }
}


export default new Middleware()
