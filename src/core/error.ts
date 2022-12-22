
import { EErrorMessage, EErrorMessageMSSQL, EErrorMessageDescriptionMSSQL } from './enum'
import logger from './logs';

export function setErrorDatabase(error: any): void {
  logger.error(`Error ${error.code}\t${error.message}`)
  if (error.message.indexOf(EErrorMessageMSSQL.MUST_DECLARE) !== -1)
    error.detail = EErrorMessageDescriptionMSSQL.MUST_DECLARE
  if (error.message.indexOf(EErrorMessageMSSQL.INCORRECT_SYNTAX) !== -1)
    error.detail = EErrorMessageDescriptionMSSQL.INCORRECT_SYNTAX
  error.message = EErrorMessage.NOT_DECLARED
}
