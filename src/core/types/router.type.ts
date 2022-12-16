import type { EHttpMethods } from '../enum'
export interface IRouterTypes {
  method: EHttpMethods;
  path: string;
  handlerName: string | symbol;
}
