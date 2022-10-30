import { type Request, type Response, type NextFunction }  from 'express';
import { Worker } from 'node:worker_threads';
import { getEnumKeyByEnumValue } from '../../utils/index.util'
import { MetadataKeys, HttpStatusCode, Status, Message } from '../../core/enum'
import { getDecorator, Get, Post } from '../../core/decorator/handler.decorator'

class EmployeeController {
  private posts: any[] = [
    {
      name: 'Muchammad Ilham',
      division: 'System Development',
      title: 'Senior'
    }
  ];

  @Get()
  public getAllEmployees = (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      return new Promise<void>(() => {
        try {
          throw new Error('Error getting all employees')
        } catch (error) {
          console.log( typeof error === 'string' ? error : error.message )
          res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
            message: Message.NOT_HANDLED,
            detail: error
          })
        }
      })
    }

  @Get()
  public getAllEmployees1 = (
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      try {
        console.log(getDecorator(MetadataKeys.ROUTERS, new EmployeeController()))
        const workerThread = new Worker(new URL('./#worker/employee.getAllEmployees1.worker.ts', import.meta.url), { workerData: this.posts})
        workerThread.on('online', () => {return console.log('employee.getAllEmployees1.worker Run')})
        workerThread.on('message', data => {
          console.log(data)
        }).on('exit', () => {
          res.status(HttpStatusCode.OK).send({
            message: Status.SUCCESS
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

  @Post('/')
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
