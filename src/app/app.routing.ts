import logger from "../utils/winston-logger";
import * as express from "express";
import * as ProductRouter from "./product/product.routing";

class Router {
  public path = "/api";
  public router = express.Router();
  private product = ProductRouter;
  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.use(this.path, this.product);
  }
}

export default Router;
