import * as express from 'express';
// import EmployeeService from './employee.service';

class EmployeeController {
  private posts: any[] = [
    {
      name: 'Marcin',
      author: 'Dolor sit amet',
      title: 'Lorem Ipsum'
    }
  ];
  getAllEmployees = (
    req: express.Request,
    res: express.Response
  ): void => {
    res.send(this.posts);
  };

  createAEmployee = (
    req: express.Request,
    res: express.Response
  ): void => {
    const post: any = req.body;
    this.posts.push(post);
    res.send(post);
  };
}

export default new EmployeeController();
