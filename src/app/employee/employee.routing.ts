import Route from '../../core/route';
import EmployeeController from './employee.controller';
class EmployeeRouter extends Route {
  private controller = EmployeeController;

  public constructor(schemaName: string) {
    super(schemaName, false);
    this.get('/getAllEmployees', this.controller.getAllEmployees);
    this.get('/getAllEmployees1', this.controller.getAllEmployees1);
    this.post('/', this.controller.createAEmployee);
  }
}

export default EmployeeRouter;
