import { Request, Response } from 'express';
import { getEnumKeyByEnumValue, HttpStatusCode, SuccessMessage, ErrorMessage } from '../../utils/index.util'
import { Worker } from 'node:worker_threads';

class TestController {
  public testWorker = async (
    req: Request,
    res: Response,
    next: any
  ): Promise<void> => {
    try {
      const workerThread = new Worker(new URL('./#worker/test.worker.ts', import.meta.url), { workerData: 'testWorker'})
      workerThread.on('online', () => {return console.log('Test Controller Run')})
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
  };
}

export default new TestController();
