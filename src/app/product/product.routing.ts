import * as express from 'express';
import ProductController from './product.controller';

class ProductRouter {
  router: express.Router;
  private controller = ProductController;

  constructor() {
    this.router = express.Router();
    this.router.get('/', this.controller.getAllProducts);
    this.router.post('/', this.controller.createAProduct);
    this.router.delete('/', this.controller.getAllProducts);
    this.router.put('/', this.controller.getAllProducts);
  }
}

export default new ProductRouter().router;
