import { Request, Response, NextFunction }  from 'express';
import { Worker } from 'node:worker_threads';
import { getEnumKeyByEnumValue, HttpStatusCode, SuccessMessage } from '../../utils/index.util'

class EmployeeController {
  private posts: any[] = [
    {
      name: 'Muchammad Ilham',
      division: 'System Development',
      title: 'Senior'
    }
  ];
  public getAllEmployees = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    res.json({ cats: this.posts });
  };

  public getAllEmployees1 = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      const workerThread = new Worker(new URL('./#worker/employee.getAllEmployees1.worker.ts', import.meta.url), { workerData: this.posts})
      workerThread.on('online', () => {return console.log('employee.getAllEmployees1.worker Run')})
      workerThread.on('message', data => {
        console.log(data)
      }).on('exit', () => {
        res.status(HttpStatusCode.OK).send({
          message: SuccessMessage.SUCCESS
        })
      }).on('error', err => { throw err })
    } catch (error) {
      console.log( typeof error === 'string' ? error : error.message )
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: getEnumKeyByEnumValue(HttpStatusCode, 'INTERNAL_SERVER_ERROR'),
        detail: error
      })
    }
  }

  public createAEmployee = (
    req: Request,
    res: Response
  ): void => {
    const post: any = req.body;
    this.posts.push(post);
    res.send(post);
  };
}

export default new EmployeeController();
