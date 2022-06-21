import * as express from 'express';

import EmployeeController from './employee.controller';

class EmployeeRouter {
  path = '/employee';
  router: express.Router;
  private controller = EmployeeController;

  constructor() {
    this.router = express.Router();
    this.router.get(this.path, this.controller.getAllEmployees);
    this.router.post(this.path, this.controller.createAEmployee);
    this.router.delete(this.path, this.controller.getAllEmployees);
    this.router.put(this.path, this.controller.getAllEmployees);
  }
}

export default new EmployeeRouter().router;
