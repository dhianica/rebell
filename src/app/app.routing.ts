import * as express from 'express';
import glob from 'fast-glob';
import { EMetadataKeys, GetDecorator  } from 'rebell-core'
import type { IRouterTypes, IConfiguration } from 'rebell-core'
class Router {

  public router: express.Router;
  private path = '/api';

  public constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const files = glob.sync('./**/*.controller.ts', {
      ignore: ['./app.routing.ts', './**/#schema/**', './**/#worker/**', './message/**'],
      cwd: 'src/app'
    })
    files.forEach(async (x) => {
      let fullpath = ''
      const names = /[^]*\//.exec(x)![0];
      const  { name, value }: IConfiguration = { name: names, value: `./${x}` }
      const basePath = `${this.path}/${name}`
      const controllerInstance = (await import(`${value}`)).default;
      const routers: IRouterTypes[] = GetDecorator(EMetadataKeys.ROUTERS, controllerInstance)
      routers.forEach(({ method, path, handlerName }) => {
        fullpath = `${basePath+path}`.replace(/\/+/g, '/');
        this.router[method](fullpath, controllerInstance[String(handlerName)].bind(controllerInstance))
      });
    })
  }
}

export default new Router().router;
