import * as express from 'express';

import UserController from './user.controller';

class UserRouter {
  path = '/users';
  router: express.Router;
  private controller = UserController;

  constructor() {
    this.router = express.Router();
    this.router.get(this.path, this.controller.getAllUsers);
    this.router.post(this.path, this.controller.createAUser);
    this.router.delete(this.path, this.controller.getAllUsers);
    this.router.put(this.path, this.controller.getAllUsers);
  }
}

export default new UserRouter().router;
