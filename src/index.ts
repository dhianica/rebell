import * as bodyParser from 'body-parser';
import * as express from 'express';

import router from './app/app.routing';

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  express: express.Application;
  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }
  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
  
    // sample route in App
    
    this.express.get('/', (req: express.Request, res: express.Response, next: {}) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use(router);
  }
}

export default new App().express;
