import { Request, Response, NextFunction } from 'express';
import Logger from './logs';
import Ajv from 'ajv'
import { isEmpty } from '../utils/index.util'
import { HttpStatusCode, Status, Message } from '../core/enum'

const ajv = new Ajv()
class Schema {
  public setSchema(schemaName: string, schema: Object): void{
    ajv.addMetaSchema(schema, schemaName);
  }
  protected validate(schemaName: string) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        Logger.info(`Run Validation Request`);
        Logger.info(`With data \t\t->${JSON.stringify(req.body)}`);
        if (!isEmpty(req.body)) {
          const isValid = await ajv.validate(schemaName, req.body);
          if (!isValid) {
            const errorMessages = ajv.errorsText()
            Logger.info(`Validation Request Failed \t-> ${errorMessages}`);
            res.status(HttpStatusCode.BAD_REQUEST).json(errorMessages);
          } else {
            Logger.info(`Validation Request Success`);
            next();
          }
        } else {
          const message = `Body ${Message.REQUIRED}!`
          Logger.info(`Validation Request Failed \t-> ${message}`);
          Logger.error(`Validation Request Failed \t-> ${message}`);
          res.status(HttpStatusCode.BAD_REQUEST).json({
            message
          });
        }
      } catch (error) {
        const message = `${Message.NOT_HANDLED}!`
        Logger.info(`Validation Request Failed \t-> ${message}`);
        Logger.error(`Validation Request Failed \t-> ${message}`);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: error
        })
      }
    }
  }
}


export default Schema;
