
import { EErrorMessage, EErrorMessageMSSQL, EErrorMessageDescriptionMSSQL } from './enum'
import logger from './logs';
import { IError } from './type';

export function setErrorDatabase(error: any): void {
  logger.error(`Error ${error.errorCode}`, JSON.stringify({ path: error.errorPath, message: error.message }))
  if (error.message.indexOf(EErrorMessageMSSQL.MUST_DECLARE) !== -1) {
    error.detail = EErrorMessageDescriptionMSSQL.MUST_DECLARE
    error.errorMessage = error.message
    error.message = EErrorMessage.NOT_DECLARED
  } else if (error.message.indexOf(EErrorMessageMSSQL.INCORRECT_SYNTAX) !== -1) {
    error.detail = EErrorMessageDescriptionMSSQL.INCORRECT_SYNTAX
    error.errorMessage = error.message
    error.message = EErrorMessage.INCORRECT_SYNTAX
  } else if (error.message.indexOf(EErrorMessageMSSQL.INVALID_OBJECT_NAME) !== -1) {
    error.detail = EErrorMessageDescriptionMSSQL.INVALID_OBJECT_NAME
    error.errorMessage = error.message
    error.message = EErrorMessage.INVALID_OBJECT_NAME
  } else if (error.message.indexOf(EErrorMessageMSSQL.INVALID_COLUMN_NAME) !== -1) {
    error.detail = EErrorMessageDescriptionMSSQL.INVALID_COLUMN_NAME
    error.errorMessage = error.message
    error.message = EErrorMessage.INVALID_COLUMN_NAME
  } else {
    error.errorMessage = error.message
    error.message = EErrorMessage.NOT_HANDLED
  }
}

export function setError(error: any): void {
  logger.error(`Error ${error.errorCode}`, JSON.stringify({ path: error.errorPath, message: error.message }))
}

export const customError = (_error: IError): any => {
  logger.error(`Error ${_error.errorCode}`, JSON.stringify({ path: _error.errorPath, message: _error.message }))
  const error = new Error(_error.message) as any
  error.errorPath = _error.errorPath
  error.errorCode = _error.errorCode
  return error
}
