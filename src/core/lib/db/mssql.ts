import mssql, { type ConnectionPool, type IResult } from 'mssql'
import { Configuration } from '../../configuration'
import { IConfiguration, IDB, IDBHelper, IDBOptions } from '../../interface';
import { isEmpty, getColumnMSSQL, wrappingDataMSSQL, generateCode, getMethodName, isString, getSafe } from '../../../utils/index.util'
import { EErrorCode, ECode, EDatabase, ECore, EErrorMessage, EMessage, ESuccessMessage } from '../../enum'
import { setErrorDatabase } from '../../error'
import { DBHelper } from './db';

abstract class MSSQLHelper extends DBHelper implements IDBHelper {
  public DBType: string = EDatabase.MSSQL;
  public DBPath: string = ECore.LIB_DB_MSSQL;
  public query (options: IDBOptions): string {

    let query = `SELECT `
    if (options.limit) query += `TOP ${options.limit} `

    query += `${options.columns}`
    query += `\nFROM ${options.table}`

    if (options.where) query += `\nWHERE ${options.where}`

    if (options.orderBy) {
      query += `\nORDER BY ${options.orderBy}`
      if (options.paginate) {
        if (!options.paginate.offset) options.paginate.offset = 0
        query += `\nOFFSET ${options.paginate.offset} ROWS`

        if (!options.paginate.fetch) options.paginate.fetch = 10
        query += `\nFETCH NEXT ${options.paginate.fetch} ROWS ONLY`
      }
    }

    return query
  }
}
export default abstract class MSSQLDB extends MSSQLHelper implements IDB {
  private pools = new Map();

  public prepareSelect<T>(connection: any, options: IDBOptions): Promise<IResult<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!options) throw new Error(EErrorMessage.NOT_DECLARED)
        if (isEmpty(options.table)) throw new Error(`${EErrorMessage.NOT_DEFINED}`)
        options.columns = this.addAttributeClauses(options)

        if (!isEmpty(options.where)) {
          options.value = options.where
          options.where = this.addWhereClausesAdvance(options)
          connection = await this.request(connection.request(), options.value)
        }
        options.orderBy = this.addOrderByClauses(options)

        const query = await this.querySelect(options)

        const data = await connection.query(query)
        resolve(data)
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${this.DBPath}-${getMethodName(error)}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`
          setErrorDatabase(error)
        }
        reject(error)
      }
    })
  }
  public select<T>(connection: any, options: IDBOptions): Promise<T[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const select = await this.prepareSelect(connection, options)
        const attributes = getColumnMSSQL(select.recordset.columns)
        const result = wrappingDataMSSQL(select.recordset, attributes)
        resolve(result)
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${this.DBPath}-${getMethodName(error)}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`
          setErrorDatabase(error)
        }
        reject(error)
      }
    })
  }
  public single<T>(connection: any, options: IDBOptions): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        options.limit = 1
        const select = await this.prepareSelect(connection, options)
        const attributes = getColumnMSSQL(select.recordset.columns)
        const result = wrappingDataMSSQL(select.recordset, attributes)
        const message = result.length > 0 ? ESuccessMessage.FETCH : EMessage.NOT_FOUND
        const data = result.length > 0 ? result[0] : []
        resolve({
          message,
          data
        } as T)
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${this.DBPath}-${getMethodName(error)}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`
          setErrorDatabase(error)
        }
        reject(error)
      }
    })
  }
  public singleOrDefault<T>(connection: any, options: IDBOptions): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        options.limit = 1
        const select = await this.prepareSelect(connection, options)
        const attributes = getColumnMSSQL(select.recordset.columns)
        const result = wrappingDataMSSQL(select.recordset, attributes)
        if (result.length < 1) resolve({
          data: Object.fromEntries(attributes.map(x => [x.name, '']))
        } as T)
        else resolve({
          data: result[0]
        } as T)
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${this.DBPath}-${getMethodName(error)}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`
          setErrorDatabase(error)
        }
        reject(error)
      }
    })
  }
  public insert<T>(connection: any, options: IDBOptions): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!options) throw new Error(EErrorMessage.NOT_DECLARED)
        if (isEmpty(options.table)) throw new Error(`${EErrorMessage.NOT_DEFINED}`)
        if (isEmpty(options.columns)) throw new Error(`${EErrorMessage.NOT_DEFINED}`)

        const query = await this.queryInsert(options)
        connection = await this.request(connection.request(), options.columns)

        const result = await connection.query(query)
        resolve(result.rowsAffected[0] ? true: false)
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${this.DBPath}-${getMethodName(error)}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`
          setErrorDatabase(error)
        }
        reject(error)
      }
    })
  }
  public insertWithDefault<T>(connection: any, options: IDBOptions): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!options) throw new Error(EErrorMessage.NOT_DECLARED)
        if (isEmpty(options.table)) throw new Error(`${EErrorMessage.NOT_DEFINED}`)
        if (isEmpty(options.columns)) throw new Error(`${EErrorMessage.NOT_DEFINED}`)

        const query = await this.queryInsert(options)
        connection = await this.request(connection.request(), options.columns)

        const data = await connection.query(query)
        resolve(options.columns)
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${this.DBPath}-${getMethodName(error)}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`
          setErrorDatabase(error)
        }
        reject(error)
      }
    })
  }
  public update<T>(connection: any, options: IDBOptions): Promise<T> {
    throw new Error('Method not implemented.');
  }
  public delete<T>(connection: any, options: IDBOptions): Promise<T> {
    throw new Error('Method not implemented.');
  }
  public execute<T>(connection: any, sp: string, paramaters?: any): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!isEmpty(paramaters))
          await this.request(connection, paramaters)
        const data = await connection.request().execute(sp)
        const columns: any = getColumnMSSQL(data.recordset.columns)
        const result = wrappingDataMSSQL(data.recordset, columns)
        resolve(result)
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${this.DBPath}-${getMethodName(new Error())}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`
          setErrorDatabase(error)
        }
        reject(error)
      }
    })

  }
  public async connect(name: string): Promise<ConnectionPool>{
    const configuration = Configuration.get('MSSQL') as IConfiguration
    if (!this.pools.has(name)) {
      if (!configuration?.value)
        throw new Error('Pool does not exist')

      const pool = new mssql.ConnectionPool(configuration.value)
      // automatically remove the pool from the cache if `pool.close()` is called
      const close = pool.close.bind(pool)
      pool.close = (...args) => {
        this.pools.delete(name)
        return close(...args)
      }
      this.pools.set(name, pool.connect())
    }
    return this.pools.get(name)
  }
  public async request(req: any, parameter: any): Promise<ConnectionPool> {
    return new Promise((resolve, reject) => {
      try {
        if (Object.keys(parameter).length === 0) throw new Error('Parameter failed to assigned')
        for (const column in parameter)
          if (Object.hasOwnProperty.call(parameter, column)) {
            const value = parameter[column];
            if (isString(value))
              req.input(column, value)
            else
              req.input(column, getSafe(() => value[0], null))
          }
        resolve(req)
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${this.DBPath}-${getMethodName(new Error())}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`
          setErrorDatabase(error)
        }
        reject(error)
      }
    })
  }
}
