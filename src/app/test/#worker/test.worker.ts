import { parentPort } from 'node:worker_threads'

const test = (): number =>  {
  let i = 0;
  for (i = 0; i < 1000000000000; i++) {
    console.log(i)
  }
  return i;
}
parentPort?.postMessage(test());
