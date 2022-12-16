import { type EHttpStatusCode, type EStatus, type EMessage } from '../enum'

export interface IResponseTypes {
  statusCode: EHttpStatusCode;
  status: EStatus;
  message: EMessage;
  detail?: any;
}

