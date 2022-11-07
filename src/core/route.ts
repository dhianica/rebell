import * as express from 'express';
import Schema from './schema';
 
/**
 * This core/route.ts reference from express.Router() for create dynamic route
 *
 * FEATURES
 * Add Middleware for schema, using variable useValidateMiddleware only set true when call super() but default is true
 * Generate endpoint using name function controller
 * 
 * TODO
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
}


export default Route;
