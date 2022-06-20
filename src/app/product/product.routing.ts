import * as express from 'express';

import ProductController from './product.controller';

class ProductRouter {
  path = '/products';
  router: express.Router;
  private controller = ProductController;

  constructor() {
    this.router = express.Router();
    this.router.get(this.path, this.controller.getAllProducts);
    this.router.post(this.path, this.controller.createAProduct);
    this.router.delete(this.path, this.controller.getAllProducts);
    this.router.put(this.path, this.controller.getAllProducts);
  }
}

export default new ProductRouter().router;
