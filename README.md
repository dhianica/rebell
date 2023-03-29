# Typescript First App
this typescript for boilerplate for creating backend services
this package using some function from another library
#### This boilerplate was built using
  * [swc-loader](https://github.com/swc-project/swc-loader)
  * [express](https://github.com/expressjs/express)
  * [ajv](https://github.com/ajv-validator/ajv)
  * [mocha](https://github.com/mochajs/mocha)
  * [webpack](https://github.com/webpack/webpack)
  * [fast-glob](https://github.com/mrmlnc/fast-glob)
  * [lodash](https://github.com/lodash/lodash)
  * [reflect-metadata](https://github.com/rbuckton/reflect-metadata)
  * [tslog](https://github.com/fullstack-build/tslog)
  * [eslint](https://github.com/eslint/eslint)
  * [dotenv](https://github.com/motdotla/dotenv)
  * [dayjs](https://github.com/iamkun/dayjs)
  * [docker](https://www.docker.com/)
  * [socket.io](https://github.com/socketio/socket.io)
  * [rabbitmq](https://github.com/amqp-node/amqplib)
  * [mssql](https://github.com/tediousjs/node-mssql)


# Quick Start
```
git clone https://github.com/dhianica/typescript-first-app.git
```

# Installation
```
npm install
```

# Running Application
```
/// run this command if want to build
npm run start:dev
```

```
/// run this command if wont to build
npm start
```

# Route
**core/decorator/route.decorator.ts** is decorator for set route handler express
if route decorator is empty the route will be using function name 
endpoint will be generate using path folder name

#### example:
  * app
    - test

  endpoint will be set **api/test**

  * ### GET
    #### example:
    ```typescript
    class TestController {
    
      @Get() //Default parameter when not declare create endpoint using method Name
      public async getAllTest(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'OK'})
      }
    }
    ```
  * ### POST
    #### example:
    ```typescript
    class TestController {
    
      @Post() //Default parameter when not declare create endpoint using method Name
      public async postTest(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'OK'})
      }
    }
    ```
  * ### DELETE
    #### example:
    ```typescript
    class TestController {
    
      @Delete() //Default parameter when not declare create endpoint using method Name
      public async deleteTest(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'OK'})
      }
    }
    ```
  * ### OPTIONS
    #### example:
    ```typescript
    class TestController {
    
      @Options() //Default parameter when not declare create endpoint using method Name
      public async optionsTest(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'OK'})
      }
    }
    ```
  * ### PUT
    #### example:
    ```typescript
    class TestController {
    
      @Put() //Default parameter when not declare create endpoint using method Name
      public async putTest(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'OK'})
      }
    }
    ```
**core/decorator/request.decorator.ts** is decorator for validate data for valid request data, in this function run check validate Body, Query and validating using schema AJV
  * ### ValidateBody
    #### example:
    ```typescript
    class TestController {
    
      @ValidateBody(Schema)
      public async postTest(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'OK'})
      }
    }
    ```
  * ### ValidateQuery
    #### example:
    ```typescript
    class TestController {
    
      @ValidateQuery(Schema)
      public async postTest(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'OK'})
      }
    }
    ```

# Middleware
 **core/middleware.ts** reference from Express Middleware for create response handler
 * loggerMiddleware
 ```typescript
  /**
   * 
   * this is loggerMiddleware for logging request handlers
   * 
   * @param request : express request
   * @param response  : express response
   * @param next : express next function
   */
  public async loggerMiddleware(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.debug(`Run ${request.path}`);
    logger.info(`Request ${request.path}`, JSON.stringify({
      path: request.path,
      method: request.method,
      data: { ...request.body, ...request.query, ...request.params }
    }));
    next()
  }
  ```

 * responseMiddleware 
 ```typescript
  /**
   * 
   * This is responseMiddleware for intercepting response handlers from controller
   * This value is dynamic, you can modify in result if not throw to exception
   * 
   * @param request : express request
   * @param response  : express response
   * @param next : express next function
   */
  public async responseMiddleware(request: Request, response: Response, next: NextFunction): Promise<void>  {
    const oldJSON = response.json;
    response.json = (data: any = {
      statusCode: EHttpStatusCode.OK,
      status: EStatus.SUCCESS,
      message: ESuccessMessage.FETCH
    }): any => {
      data = {
        statusCode: EHttpStatusCode.OK,
        status: EStatus.SUCCESS,
        message: ESuccessMessage.FETCH,
        ...data
      }
      logger.info(`Response ${request.path}`, JSON.stringify(data))
      if (data && data.status === EStatus.FAILED)
        return oldJSON.call(response.status(data.statusCode), {
          status: data.status,
          message: data.message,
          errorCode: data.errorCode,
          detail: data.detail
        } as IResponseTypes)
      else
        return oldJSON.call(response.status(data.statusCode), {
          status: data.status,
          message: data.message,
          detail: data.detail
        } as IResponseTypes);

    }
    next()
  }
 ```

 * errorMiddleware
 ```typescript
  /**
   * 
   * This is errorMiddleware for logging errors response from controller and next to responseMiddleware
   * This value is dynamic, you can modify in exception Error
   * 
   * @param error : any
   * @param request : express request
   * @param response  : express response
   * @param next : express next function
   */
  public async errorMiddleware(error: any | '' | null | undefined, request: Request, response: Response, next: NextFunction): Promise<any>  {
    response.json({
      statusCode: EHttpStatusCode.INTERNAL_SERVER_ERROR,
      status: EStatus.FAILED,
      message: error.message,
      errorCode: error.errorCode,
      detail: error.detail
    } as IResponseTypes)
  }
 ```

# Schema
for using Ajv Schema, can declare the schema in folder **src/app/*/#schema** with file name ***.schema.ts**
this schema will be set in function ajv.addMetaSchema(schema, schemaName), schemaName automatically set with folder name file path
#### example:
  * app
    - test
      - #schema
        - test.schema.ts

  schemaName will be Generate with name **TestSchema**
# Worker Threads
for using Worker Threads, can declare the worker function in folder **src/app/*/#worker** with file name ***.[functionName].worker.ts**
#### example:
  * app
    - test
      - #worker
        - test.getAllTest.worker.ts
  ```typescript
  import { workerData, parentPort } from 'node:worker_threads'

  const getAllTest = (): any =>  {
    return workerData.name;
  }
  parentPort?.postMessage(getAllTest());
  ```

# Response

**core/type.ts** is interface for declare all type used in this app

```typescript
export interface IResponseTypes {
  statusCode: EHttpStatusCode;
  status: EStatus;
  message: ESuccessMessage | EErrorMessage;
  errorMessage: any;
  errorCode: any;
  detail?: any;
}
```

this interface use in the response.json() for create response success
#### example:
```typescript
const result: IResponseTypes = {
  statusCode: HttpStatusCode.OK,
  status: Status.SUCCESS,
  message: Message.FETCH 
}
response.json(result)
```

and use next() for create response error
#### example:
```typescript
const result: IResponseTypes = {
  statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  status: Status.FAILED,
  message: Message.NOT_HANDLED,
  detail: error.message
}
next(result)
```

# Utility Methods

## src/utils/utilities.ts
* #### camelCase
```typescript
/**
 * 
 * This is function for convert a string to style CamelCase
 * 
 * @param str string - params want to be convert
 * @returns string - string with camelCase
 */
export const camelCase = (str: string): string => {return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => {return chr.toUpperCase();});};
```

* #### getLastDirectory
```typescript
/**
 * 
 * This is function for get last directory from path
 * 
 * @param currentDirectory string - params want to be get a last directory from path
 * @returns string - string name last directory 
 */
export const getLastDirectory = (currentDirectory: string): string => {return path.basename(path.resolve(currentDirectory));};
```

* #### isEmpty
```typescript
/**
 * 
 * This is function for check params is empty or not
 * 
 * @param param any - params want to be check
 * @returns boolean - true if param dont have value, default false
 */
export function isEmpty(param: any): boolean {
  if (typeof param === 'object') {return Object.keys(param).length < 1;} else if (Array.isArray(param)) {return param.length < 1;}
  return false;
}
```

* #### getEnumKeyByEnumValue
```typescript
/**
 * 
 * This is function for get the key from value enum
 * 
 * @param myEnum any - data enum want to be check
 * @param enumValue number | string - value want to be your get the key 
 * @returns string - key from value you check
 */
export function getEnumKeyByEnumValue(myEnum: any, enumValue: number | string): string {
  const keys = Object.keys(myEnum).filter((x) => {return myEnum[x] === enumValue;});
  return keys.length > 0 ? keys[0] : '';
}
```

* #### flatten
```typescript
/**
 * 
 * This is function for convert array to be flatten
 * 
 * @param arrs Array - data want to be convert to flatten
 * @returns Array - array with format flatten
 */
export const flatten = <T>(arrs: Array<Array<T>>): Array<T> => {return ([] as Array<T>).concat(...arrs);};
```

* #### groupBy
```typescript
/**
 *
 * This is function for grouping array with specifiec key
 *  
 * @param arr Array - data want to be grouping
 * @param key any - key want to be gropuing example: x => x.name
 * @returns Array -> array with new format grouping
 */
export function groupBy<K, V>(array: V[], grouper: (item: V) => K): Map<K, V[]> {
  return array.reduce((store, item) => {
    const key = grouper(item);
    if (!store.has(key)) {
      store.set(key, [item]);
    } else {
      store.get(key)?.push(item);
    }
    return store;
  }, new Map<K, V[]>());
}
```

* #### transformMap
```typescript
export function transformMap<K, V, R>(
  source: Map<K, V>,
  transformer: (value: V, key: K) => R
): Map<K,R>{
  return new Map(
    Array.from(source, v => {return [v[0], transformer(v[1], v[0])];})
  );
}
```

* #### mapToObj
```typescript
export function mapToObj<T>(m: Map<string, T>): { [key: string]: T } {
  return Array.from(m).reduce((obj: { [key: string]: T }, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}
```

* #### mapToArray
```typescript
export function mapToArray<K, V, R>(
  m: Map<K, V>,
  transformer: (key: K, item: V) => R
): Array<R> {
  return Array.from(m.entries()).map(x => {return transformer(x[0], x[1]);}
  );
}
```

* #### range
```typescript
/**
 * 
 * This is function for generate data number with range
 * 
 * @param start number - params start number want to be generate
 * @param end number - params end number want to be generate
 * @param step number - params step number row arithmatic want to be 
 * @returns number - array with range
 */
export const range = (start: number, end: number, step: number = 1): Array<number> => {return [...Array(Math.ceil(end / step)).keys()].map(i => {return i * step + start;});};
```

* #### convertParamToObject
```typescript
/**
 *
 * This is function for convert query params from URL to Object Json
 *
 * @param str : string -> query params from URL
 * @returns : object
 */
export const convertParamToObject = (str: string): Object => Object.fromEntries(new URLSearchParams(str))
```

* #### objectEntries
```typescript
export const objectEntries = (obj: Object): any => {
  let index = 0;

  // In ES6, you can use strings or symbols as property keys,
  // Reflect.ownKeys() retrieves both
  const propKeys = Reflect.ownKeys(obj);

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (index < propKeys.length) {
        const key = propKeys[index];
        index++;
        return { value: [key, obj[key]]};
      } else {
        return { done: true };
      }
    }
  };
}
```

* #### generateCode
```typescript
/**
 * This is function for generate unique code
 *
 * @param len number - params for generate total length string
 * @returns  string - unique string
 */
export const generateCode = (len: number = 3): string => crypto.randomBytes(len).toString('hex').toUpperCase()
```

* #### getMethodName
```typescript
/**
 * This is function for get method name using new Error
 *
 * @param len number - params new Error
 * @returns  string - method name
 */
export const getMethodName = (error: Error): string => /at \w+\.(\w+)/.exec(error.stack)[0].replace(/at /, '')
```

* #### getSafe
```typescript
export function getSafe(fn: Function, defaultVal: any): void  {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}
```

* #### stringToArray
```typescript
/**
 * This is function for convert string of array to array
 *
 * @param n string - params string of array
 * @returns array - array data from string with commas separated
 */
export const stringToArray = (n: string): any => n.replace(/\[|\]/g, '').split(',')
```


## src/utils/validate.util.ts

| Name | Description |
| --- | --- |
| `isEmpty` | ` This is function for check params is empty or not ` |
| `isValidDate` | ` This is function for check validate date ` |
| `isNumber` | ` This is function for check validate numbe ` |
| `isString` | ` This is function for check validate string ` |
| `isObject` | ` This is function for check validate object ` |

# Unit Test

this testing using mocha and supertest, this file test must be declared in same path with file ***.controller.ts**
and the name file must be set ***.controller.spec.ts**

* ##### example (**employee.controller.spec.ts**)
```typescript
describe('Unit Test Employee', (): void => {
  it('should GET', async (): Promise<void> => {
    const res = await request(App).get('/api/employee/');
    expect(res.status).to.equal(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.be.an('array');
  });
});
```


# Logs
**core/logs.ts** function for create logging

| Name | Function |
| --- | --- |
| `logger.silly` | ``` logger.silly() ``` |
| `logger.debug` | ``` logger.debug() ``` |
| `logger.trace` | ``` logger.trace() ``` |
| `logger.info` | ``` logger.info() ``` |
| `logger.warn` | ``` logger.warn() ``` |
| `logger.error` | ``` logger.error() ``` |
| `logger.fatal` | ``` logger.fatal() ``` |


# Next Features
- #### Add Documentation API with Open API 3.0
- #### Create Class library third party for Connection Database (Mysql, PostgreSQL, MongoDB, etc)
