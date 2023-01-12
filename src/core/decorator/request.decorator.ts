import Ajv, { SchemaObject } from 'ajv'
// import ajvErrors from 'ajv-errors';
import 'reflect-metadata'
import Logger from '../logs'
import { EHttpStatusCode, EStatus, ESuccessMessage, EErrorMessage, EErrorCode, EDatabase, ECore  } from '../enum'
import type { IResponseTypes } from '../interface'
import { generateCode, getMethodName } from '../../utils/index.util'
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
const ValidateReq = (source: 'body' | 'query' | 'params') =>
  (schema: SchemaObject): any =>
    (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>): any => {
      const method = descriptor.value;
      descriptor.value = async function () {
        const [req, res, next] = arguments;
        try {
          Logger.info(`Validation Request`);
          Logger.debug('With data', JSON.stringify(req[source]));
          const validate = await ajv.validate(schema, req[source]);
          if (!validate) {
            const errorCode = `${EErrorCode.CORE}-${ECore.DECORATOR_REQUEST}-${generateCode(4)}`
            const errorMessages = ajv.errorsText()
            Logger.error(`Error ${errorCode}`, `Validation Request Failed ${errorMessages}`);
            const result: IResponseTypes = {
              statusCode: EHttpStatusCode.BAD_REQUEST,
              status: EStatus.FAILED,
              message: EErrorMessage.INVALID_DATA,
              detail: errorMessages,
              errorCode,
              errorMessage: errorMessages
            }
            next(result)
          } else {
            Logger.info('Validation Request Success', JSON.stringify(req[source]));
            method?.apply(this, arguments)
          }
        } catch (error) {
          const errorCode = `${EErrorCode.CORE}-${ECore.DECORATOR_REQUEST}-${generateCode(4)}`
          Logger.error(`Error ${errorCode}`, {
            path:`${EErrorCode.CORE}-${ECore.DECORATOR_REQUEST}-${getMethodName(error)}`,
            message: `Validation Request Failed ${error.message}`
          });

          const result: IResponseTypes = {
            statusCode: EHttpStatusCode.INTERNAL_SERVER_ERROR,
            status: EStatus.FAILED,
            message: EErrorMessage.NOT_HANDLED,
            detail: error.message,
            errorCode,
            errorMessage: error.message
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
