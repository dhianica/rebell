import { type EHttpStatusCode, type EStatus, type ESuccessMessage, type EErrorMessage } from '../enum'

export interface IResponseTypes {
  statusCode: EHttpStatusCode;
  status: EStatus;
  message: ESuccessMessage | EErrorMessage;
  errorMessage: any;
  errorCode: any;
  detail?: any;
}

