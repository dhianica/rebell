import * as express from 'express';
import * as glob from 'glob';
import { setUrlRoute, setSchemaName } from '../utils/index.util'
import Schema from '../core/schema';
import { Configuration, IConfiguration } from '../core/configuration';
import { GetDecorator } from '../core/decorator/handler.decorator'
import { MetadataKeys } from '../core/enum'
import type { RouterTypes } from '../core/types/router.type'
class Router extends Configuration {

  public router: express.Router;
  private path = '/api';

  public constructor() {
    super();
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    glob
      .sync('./**/*(*.controller.ts|*.schema.ts)', {
        ignore: ['./app.routing.ts', './core/**', './**/#worker/**', './message/**'],
        cwd: './src/app'
      }).map(v => {
        if (/[^.]*\//.test(v)) {
          const name = /[^.]*\//.exec(v)![0];
          const item = { name, value: v } as unknown as IConfiguration
          return item as IConfiguration
        }
      }).forEach(x => {return this.addConfiguration(x as IConfiguration)})
    // const info: Array<{ api: string; handler: string }> = []
    this.configuration().forEach((x: IConfiguration[]) => {
      return x.forEach(async ({ name, value }) => {
        const basePath = setUrlRoute(this.path, value);
        if (value.indexOf('controller') > 0) {
          const controllerInstance = (await import(`${value}`)).default;
          const routers: RouterTypes[] = GetDecorator(MetadataKeys.ROUTERS, controllerInstance)
          routers.forEach(({ method, path, handlerName}) => {
            this.router[method](`${basePath+path}`, controllerInstance[String(handlerName)].bind(controllerInstance))
          });
        } else if (value.indexOf('schema') > 0) {
          const schemaName = setSchemaName(name);
          const typeSchema = (await import(`${value}`));
          new Schema().setSchema(schemaName, typeSchema.schema)
        }
      })
    })
  }
}

export default new Router().router;
