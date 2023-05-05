# Rebell
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
**rebell-core** is decorator for set route handler express
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
    
      @ValidateBody(Schema) //Default parameter when not declare create endpoint using method Name
      public async postTest(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'OK'})
      }
    }
    ```
  * ### ValidateQuery
    #### example:
    ```typescript
    class TestController {
    
      @ValidateQuery(Schema) //Default parameter when not declare create endpoint using method Name
      public async postTest(req: Request, res: Response, next: NextFunction) {
        res.json({ message: 'OK'})
      }
    }
    ```

# Middleware
 **rebell-core** reference from Express Middleware for create response handler
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

  const getAllEmployees1 = (): any =>  {
    return workerData.name;
  }
  parentPort?.postMessage(getAllEmployees1());
  ```

# Response

**rebell-core** is interface for declare all type used in this app

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

# Next Features
- #### Add Documentation API with Open API 3.0
- #### Create Class library third party for Connection Database (Mysql, PostgreSQL, MongoDB, etc)
