import { Request, Response } from 'express';
import { Worker } from 'node:worker_threads';
import { ResponseTypes } from '../../core/types/response.type'
import { getEnumKeyByEnumValue } from '../../utils/index.util'
import { HttpStatusCode, Status, Message } from '../../core/enum'

class TestController {
  public testWorker = async (
    req: Request,
    res: Response,
    next: any
  ): Promise<ResponseTypes> => {
    return new Promise<ResponseTypes>((resolve, reject) => {
      try {
        const workerThread = new Worker(new URL('./#worker/test.worker.ts', import.meta.url), { workerData: 'testWorker'})
        workerThread.on('online', () => {return console.log('Test Controller Run')})
        workerThread.on('message', data => {
          console.log(data)
        }).on('exit', () => {
          resolve({
            statusCode: HttpStatusCode.OK,
            status: Status.Success,
            message: Message.FETCH
          } as ResponseTypes)
        }).on('error', err => { throw err })
      } catch (error) {
        console.log( typeof error === 'string' ? error : error.message )
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: getEnumKeyByEnumValue(HttpStatusCode, 'INTERNAL_SERVER_ERROR'),
          detail: error
        })
      }
    })
    
  };
}

export default new TestController();
