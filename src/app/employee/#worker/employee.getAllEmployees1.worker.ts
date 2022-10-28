import { workerData, parentPort } from 'node:worker_threads'

const getAllEmployees1 = (): any =>  {
  console.log(workerData)
  return workerData.name;
}
parentPort?.postMessage(getAllEmployees1());
