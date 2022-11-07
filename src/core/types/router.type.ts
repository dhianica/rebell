import type { HttpMethods } from '../enum'
export interface IRouterTypes {
  method: HttpMethods;
  path: string;
  handlerName: string | symbol;
}
