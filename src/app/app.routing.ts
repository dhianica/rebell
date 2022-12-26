import * as express from 'express';
import glob from 'fast-glob';
import { GetDecorator  } from '../core/decorator/base.decorator'
import { EMetadataKeys } from '../core/enum'
import type { IRouterTypes, IConfiguration } from '../core/type'
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
      const names = /[^]*\//.exec(x)![0];
      const  { name, value }: IConfiguration = { name: names, value: `./${x}` }
      const basePath = `${this.path}/${name}`
      const controllerInstance = (await import(`${value}`)).default;
      const routers: IRouterTypes[] = GetDecorator(EMetadataKeys.ROUTERS, controllerInstance)
      routers.forEach(({ method, path, handlerName }) => {
        this.router[method](`${basePath+path}`, controllerInstance[String(handlerName)].bind(controllerInstance))
      });
    })
  }
}

export default new Router().router;
