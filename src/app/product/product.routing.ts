import * as express from 'express';
import * as ProductController from './product.controller';
 
class ProductRouter {
  public path = '/products';
  public router = express.Router();
  private controller = ProductController.default;

  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.controller.getAllProducts);
    this.router.post(this.path, this.controller.createAProduct);
  }
}
 
export default new ProductRouter().router;