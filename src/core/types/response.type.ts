import { type HttpStatusCode, type Status, type Message } from '../enum'

export interface IResponseTypes {
  statusCode: HttpStatusCode;
  status: Status;
  message: Message;
  detail?: any;
}

