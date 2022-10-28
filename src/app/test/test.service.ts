import * as express from 'express';

class EmployeeService {
  private posts: any[] = [
    {
      name: 'Marcin'
    }
  ];

  public getAllEmployees = (req: express.Request, res: express.Response): void => {
    res.send(this.posts);
  };
}
