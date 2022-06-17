import * as express from "express";
import ProductRouter from "./product/product.routing";

class Router {
  public path = "/api";
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.use(this.path, ProductRouter);
  }
}

export default new Router().router;
