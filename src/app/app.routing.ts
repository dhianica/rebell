import * as express from 'express';
import glob from 'fast-glob';
import { setSchemaName } from '../utils/index.util'
import Schema from '../core/schema';
import { GetDecorator } from '../core/decorator/base.decorator'
import { MetadataKeys } from '../core/enum'
import type { IRouterTypes } from '../core/types/router.type'
import  '../core/types/configuration.type';
class Router {

  public router: express.Router;
  private path = '/api';

  public constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const files = glob.sync('./**/*(*.controller.ts|*.schema.ts)', {
      ignore: ['./app.routing.ts', './core/**', './**/#worker/**', './message/**'],
      cwd: 'src/app'
    })
    files.forEach(async (x) => {
      const names = /[^]*\//.exec(x)![0];
      const  { name, value }: IConfiguration = { name: names, value: `./${x}` }
      if (value.indexOf('controller') > 0) {
        const basePath = `${this.path}/${name}`
        const controllerInstance = (await import(`${value}`)).default;
        const routers: IRouterTypes[] = GetDecorator(MetadataKeys.ROUTERS, controllerInstance)
        routers.forEach(({ method, path, handlerName}) => {
          this.router[method](`${basePath+path}`, controllerInstance[String(handlerName)].bind(controllerInstance))
        });
      } else if (value.indexOf('schema') > 0) {
        const schemaName = setSchemaName(name);
        const typeSchema = (await import(`${value}`));
        new Schema().setSchema(schemaName, typeSchema.schema)
      }
    })
  }
}

export default new Router().router;
