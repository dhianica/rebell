import Route from '../../core/route';
import TestController from './test.controller';

class TestRouter extends Route {
  private controller = TestController;

  public constructor() {
    super('', false);
    this.get('/', this.controller.testWorker);
  }
}

export default TestRouter;
