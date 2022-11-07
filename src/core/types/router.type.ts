import type { HttpMethods } from '../enum'
export interface RouterTypes {
  method: HttpMethods;
  path: string;
  handlerName: string | symbol;
}
