import * as express from 'express';
import Schema from './schema';
 
/**
 * This core/route.ts reference from express.Router() for create dynamic route
 *
 * FEATURES
 * Add Middleware for schema, using variable useValidateMiddleware only set true when call super() but default is true
 * 
 * TODO
 * Generate endpoint using name function controller
 * Dynamic setting useValidateMiddeware
*/
class Route  {
  public router: express.Router;
  public schemaName: string;
  public useValidateMiddleware: boolean;

  public constructor(schemaName: string, useValidateMiddleware: boolean = true) {
    this.router = express.Router();
    this.schemaName = schemaName;
    this.useValidateMiddleware = useValidateMiddleware;
  }
  // public get(path: string, ...params: any[]): void {
  //   if (this.useValidateMiddleware) {
  //     this.router.get(path, this.validate(this.schemaName), params);
  //   } else {
  //     this.router.get(path, params)
  //   }
  // }

  // public post(path: string, ...params: any[]): void {
  //   if (this.useValidateMiddleware) {
  //     this.router.post(path, this.validate(this.schemaName), params);
  //   } else {
  //     this.router.post(path, params)
  //   }
  // }

  // public delete(path: string, ...params: any[]): void {
  //   if (this.useValidateMiddleware) {
  //     this.router.delete(path, this.validate(this.schemaName), params);
  //   } else {
  //     this.router.delete(path, params)
  //   }
  // }

  // public put(path: string, ...params: any[]): void {
  //   if (this.useValidateMiddleware) {
  //     this.router.put(path, this.validate(this.schemaName), params);
  //   } else {
  //     this.router.put(path, params)
  //   }
  // }

  // public options(path: string, ...params: any[]): void {
  //   if (this.useValidateMiddleware) {
  //     this.router.options(path, this.validate(this.schemaName), params);
  //   } else {
  //     this.router.options(path, params)
  //   }
  // }
}


export default Route;
