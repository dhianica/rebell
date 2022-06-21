import * as express from 'express';
import * as glob from 'glob';

class Router {
  router: express.Router;
  private path = '/api';
  constructor() {
    this.router = express.Router();
    this.intializeRoutes();
  }

  private intializeRoutes(): void {
    glob
      .sync('./**/*.routing.ts', {
        ignore: './app.routing.ts',
        cwd: './src/app'
      })
      .forEach(async (file: any): Promise<void> => {
        const route = (await import(`${file}`)).default;
        this.router.use(this.path, route);
      });
  }
}

export default new Router().router;
