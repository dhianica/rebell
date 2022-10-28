import { type HttpStatusCode, type Status, type Message } from '../enum'

export interface ResponseTypes {
  statusCode: HttpStatusCode;
  status: Status;
  message: Message;
  detail: any;
}
  
