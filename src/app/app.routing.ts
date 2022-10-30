import * as express from 'express';
import * as glob from 'glob';
import { setUrlRoute, setSchemaName } from '../utils/index.util'
import Schema from '../core/schema';
import { Configuration, IConfiguration } from '../core/configuration';

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
        ignore: ['./app.routing.ts', './core/**', './**/#worker/**', './**/#schema/**', './message/**'],
        cwd: './src/app'
      }).map(v => {
        if (/[^.]*\//.test(v)) {
          const name = /[^.]*\//.exec(v)![0];
          const item = { name, value: v } as unknown as IConfiguration
          return item as IConfiguration
        }
      }).forEach(x => {return this.addConfiguration(x as IConfiguration)})
    this.configuration().forEach((x: IConfiguration[]) => {
      return x.forEach(async ({ name, value }) => {
        const path = setUrlRoute(this.path, value);
        if (value.indexOf('controller') > 0) {
          const fileRoute = (await import(`${value}`)).default;
          // const route = new fileRoute(setSchemaName(name));
          console.log(path, fileRoute)
          // this.router.use(path, route.router);
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
