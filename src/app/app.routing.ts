import * as express from 'express';
import * as glob from 'glob';

class Router {
  private path = '/api';
  router: express.Router;
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
      .forEach(async (file) => {
        const route = (await import(`${file}`)).default;
        this.router.use(this.path, route);
      });
  }
}

export default new Router().router;
