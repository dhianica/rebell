import mssql, { type ConnectionPool } from 'mssql'
import { Configuration } from '../../configuration'
import { IConfiguration, IDB, IDBHelper, IDBOptions } from '../../type';
import { isEmpty, getColumnMSSQL, wrappingDataMSSQL, generateCode, getMethodName } from '../../../utils/index.util'
import { EErrorCode, ECode, EDatabase, ECore, EErrorMessage } from '../../enum'
import { setErrorDatabase } from '../../error'
import { DBHelper } from './db';

abstract class MSSQLHelper extends DBHelper implements IDBHelper {
  public DBType: string = EDatabase.MSSQL;
  public DBPath: string = ECore.LIB_DB_MSSQL;
  public query (isSingle: boolean = false, options: IDBOptions): string {

    let query = `SELECT `
    if (isSingle) query += 'TOP 1 '

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

  public select<T>(connection: any, options: IDBOptions): Promise<T[]> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!options) throw new Error(EErrorMessage.NOT_DECLARED)
        if (isEmpty(options.table)) throw new Error(`${EErrorMessage.NOT_DEFINED}`)

        options.columns = this.addAttributeClauses(options)

        if (!isEmpty(options.where)) {
          options.value = options.where
          options.where = this.addWhereClausesAdvance(options)
        }

        options.orderBy = this.addOrderByClauses(options)

        const query = await this.querySelect(options)

        if (!isEmpty(options.where))
          connection = await this.request(connection.request(), options.value)

        const data = await connection.query(query)
        const attributes = getColumnMSSQL(data.recordset.columns)
        const result = wrappingDataMSSQL(data.recordset, attributes)
        resolve(result)
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${ECore.LIB_DB_MSSQL}-${getMethodName(error)}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${EDatabase.MSSQL}-${generateCode(4)}`
          setErrorDatabase(error)
        }
        reject(error)
      }
    })
  }
  public selectSingle<T>(connection: any, options: IDBOptions): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!options) throw new Error(EErrorMessage.NOT_DECLARED)
        if (isEmpty(options.table)) throw new Error(`${EErrorMessage.NOT_DEFINED}`)

        options.columns = this.addAttributeClauses(options)

        if (!isEmpty(options.where)) {
          options.value = options.where
          options.where = this.addWhereClausesAdvance(options)
        }

        options.orderBy = this.addOrderByClauses(options)

        const query = await this.querySelectSingle(options)

        if (!isEmpty(options.where))
          connection = await this.request(connection.request(), options.value)

        const data = await connection.query(query)
        const attributes = getColumnMSSQL(data.recordset.columns)
        const result = wrappingDataMSSQL(data.recordset, attributes)
        resolve(result.length > 0 ? result[0]: result)
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${ECore.LIB_DB_MSSQL}-${getMethodName(error)}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${EDatabase.MSSQL}-${generateCode(4)}`
          setErrorDatabase(error)
        }
        reject(error)
      }
    })
  }
  public selectSingleOrDefault<T>(connection: any, options: IDBOptions): Promise<any> | Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!options) throw new Error(EErrorMessage.NOT_DECLARED)
        if (isEmpty(options.table)) throw new Error(`${EErrorMessage.NOT_DEFINED}`)

        options.columns = this.addAttributeClauses(options)

        if (!isEmpty(options.where)) {
          options.value = options.where
          options.where = this.addWhereClausesAdvance(options)
        }

        options.orderBy = this.addOrderByClauses(options)

        const query = await this.querySelectSingle(options)

        if (!isEmpty(options.where))
          connection = await this.request(connection.request(), options.value)

        const data = await connection.query(query)
        const attributes = getColumnMSSQL(data.recordset.columns)
        if (data.recordset.length < 1) resolve(Object.fromEntries(attributes.map(x => [x.name, ''])))
        const result = wrappingDataMSSQL(data.recordset, attributes)
        resolve(result[0])
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${ECore.LIB_DB_MSSQL}-${getMethodName(error)}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${EDatabase.MSSQL}-${generateCode(4)}`
          setErrorDatabase(error)
        }
        reject(error)
      }
    })
  }
  public insert<T>(connection: any, options: IDBOptions): Promise<T> {
    throw new Error('Method not implemented.');
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
        const columns: any = await getColumnMSSQL(data.recordset.columns)
        const result = await wrappingDataMSSQL(data.recordset, columns)
        resolve(result)
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${ECore.LIB_DB_MSSQL}-${getMethodName(new Error())}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${EDatabase.MSSQL}-${generateCode(4)}`
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
            const value = parameter[column][0];
            req.input(column, value)
          }
        resolve(req)
      } catch (error) {
        error.errorPath = `${EErrorCode.DATABASE}-${ECore.LIB_DB_MSSQL}-${getMethodName(new Error())}`
        if (error.code === ECode.EREQUEST) {
          error.errorCode = `${EErrorCode.DATABASE}-${EDatabase.MSSQL}-${generateCode(4)}`
          setErrorDatabase(error)
        }
        reject(error)
      }
    })
  }
}
