import * as bodyParser from 'body-parser';
import express from 'express';
import Middleware from './core/middleware'

import router from './app/app.routing';

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public express: express.Application;
  // Run configuration methods on the Express instance.
  public constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    // this.response();
  }
  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(Middleware.loggerMiddleware)
  }
  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    // sample route in App
    this.express.get('/', (req: express.Request, res: express.Response, next: {}): void => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use(router);
  }
}

export default new App().express;
