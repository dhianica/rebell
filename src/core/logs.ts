import { ILogObj, Logger } from 'tslog';
import { appendFileSync } from 'fs';
import dayjs from 'dayjs';
import { createStream } from 'rotating-file-stream';

function logToTransport(logObject: string): void {
  const stream = createStream('./logs/info.log', {
    size: '10M', // rotate every 10 MegaBytes written
    interval: '1d', // rotate daily
    compress: 'gzip' // compress rotated files
  });
  stream.write(JSON.stringify(logObject) + '\n');
}

function errorLogToTransport(logObject: string): void {
  const stream = createStream('./logs/error.log', {
    size: '10M', // rotate every 10 MegaBytes written
    interval: '1d', // rotate daily
    compress: 'gzip' // compress rotated files
  });
  stream.write(JSON.stringify(logObject) + '\n');
}

function debugLogToTransport(logObject: string): void {
  const stream = createStream('./logs/debug.log', {
    size: '10M', // rotate every 10 MegaBytes written
    interval: '1d', // rotate daily
    compress: 'gzip' // compress rotated files
  });
  stream.write(JSON.stringify(logObject) + '\n');
}

const logger: Logger<ILogObj> = new Logger({
  prettyLogTemplate: '{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}} ',
  stylePrettyLogs: true,
  argumentsArrayName: 'argumentsArray'
})


logger.attachTransport((data: any) => {
  const { argumentsArray } = data
  // eslint-disable-next-line no-underscore-dangle
  const { date, logLevelId, logLevelName } = data._meta
  const logs = `[${dayjs(date).format('YYYY-MM-DD HH:mm:ss')}] -> ${logLevelName} : ${argumentsArray.join('\t')}`;
  if (logLevelId === 3) logToTransport(logs)
  else if (logLevelId === 2) debugLogToTransport(logs)
  else if (logLevelId === 5) errorLogToTransport(logs)
});

export default logger;
