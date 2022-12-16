import Ajv, { SchemaObject } from 'ajv'
// import ajvErrors from 'ajv-errors';
import 'reflect-metadata'
import Logger from '../logs'
import { EHttpStatusCode, EStatus, EMessage } from '../enum'
import type { IResponseTypes } from '../types'
const ajv = new Ajv({ allErrors: true })
ajv.addKeyword('errorMessage')


/**
 * This core/decorator/request.decorator.ts
 *
 * FEATURES
 * Dynamic setting for validate schema
*/

/**
 *
 * This decorator validate reference from https://github.com/codezisland/validation-decorator-example
 *
 * @param source : string -> for get data from body or query params
 * @returns next()
 */
const ValidateReq = (source: 'body' | 'query') =>
  (schema: SchemaObject): any =>
    (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>): any => {
      const method = descriptor.value;
      descriptor.value = async function () {
        const [req, res, next] = arguments;
        try {
          Logger.info(`Validation Request`);
          Logger.debug(`With data\t\t\t\t\t${JSON.stringify(req[source])}`);
          const validate = await ajv.validate(schema, req[source]);
          if (!validate) {
            const errorMessages = ajv.errorsText()
            Logger.error(`Validation Request Failed\t\t\t${errorMessages}`);
            const result: IResponseTypes = {
              statusCode: EHttpStatusCode.BAD_REQUEST,
              status: EStatus.FAILED,
              message: EMessage.ERROR_VALIDATE,
              detail: errorMessages
            }
            next(result)
          } else {
            Logger.info(`Validation Request Success\t\t\t${JSON.stringify(req[source])}`);
            method?.apply(this, arguments)
          }
        } catch (error) {
          const errorMessages = `${EMessage.NOT_HANDLED}!`
          Logger.error(`Validation Request Failed\t\t\t${errorMessages}`);
          const result: IResponseTypes = {
            statusCode: EHttpStatusCode.INTERNAL_SERVER_ERROR,
            status: EStatus.FAILED,
            message: EMessage.NOT_HANDLED,
            detail: error.message
          }
          next(result)
        }
      }
    };

const ValidateAuth = (): void => {
  console.log('')
}

export const ValidateRole = ValidateAuth
export const ValidateQuery = ValidateReq('query');
export const ValidateBody = ValidateReq('body');
