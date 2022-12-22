import mssql, { type ConnectionPool, type Request } from 'mssql'
import { Configuration } from '../../configuration'
import { IConfiguration } from '../../types';
import { isEmpty, getColoumnMSSQL, wrappingDataMSSQL, mssqlHelper } from '../../../utils/index.util'
import { EErrorCode, ECode, EDatabase } from '../../enum'
import { shortEncrypt } from '../../crypto/encrypt'
import { setErrorDatabase } from '../../error'
class MSSQL {
  private pool: any;
  private pools = new Map();

  public async connect(name: string): Promise<ConnectionPool>{
    const configuration = Configuration.get('MSSQL') as IConfiguration
    if (!this.pools.has(name)) {
      if (!configuration.value)
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
        if (error.code === ECode.EREQUEST)
          error.code = `${EErrorCode.DATABASE}-${EDatabase.MSSQL}-${shortEncrypt(this.constructor.name)}`
        reject(error)
      }
    })
  }

  public async execute(req: ConnectionPool, sp: string, parameter?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!isEmpty(parameter))
          await this.request(req, parameter)
        const data = await req.request().execute(sp)
        const columns: any = await getColoumnMSSQL(data.recordset.columns)
        const result = await wrappingDataMSSQL(data.recordset, columns)
        resolve(result)
      } catch (error) {
        if (error.code === ECode.EREQUEST)
          error.code = `${EErrorCode.DATABASE}-${EDatabase.MSSQL}-${shortEncrypt(this.constructor.name)}`
        setErrorDatabase(error)
        reject(error)
      }
    })

  }
  public async query(req: ConnectionPool, query: string, parameter?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!isEmpty(parameter))
          await this.request(req, parameter)
        const data = await req.query(query)
        const columns: any = await getColoumnMSSQL(data.recordset.columns)
        const result = await wrappingDataMSSQL(data.recordset, columns)
        resolve(result)
      } catch (error) {
        if (error.code === ECode.EREQUEST)
          error.code = `${EErrorCode.DATABASE}-${EDatabase.MSSQL}-${shortEncrypt(this.constructor.name)}`

        setErrorDatabase(error)
        reject(error)
      }
    })
  }

  public async select(req: ConnectionPool, options: {
    table: string;
    column?: any;
    where?: any;
    orderBy?: any;
    paginate?: {
      offset?: number;
      fetch?: number;
    };
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (isEmpty(options.table)) throw new Error('table must be defined!')
        const columns = mssqlHelper.addAttributeClauses(options)
        const whereClauses = mssqlHelper.addWhereClausesAdvance(options)
        options.orderBy = mssqlHelper.addOrderByClauses(options)
        const query = await mssqlHelper.querySelect(columns, options.table, whereClauses, options)
        if (!isEmpty(whereClauses))
          req = await this.request(req.request(), options.where)

        const data = await req.query(query)
        const attributes: any = await getColoumnMSSQL(data.recordset.columns)
        const result = await wrappingDataMSSQL(data.recordset, attributes)
        resolve(result)
      } catch (error) {
        if (error.code === ECode.EREQUEST)
          error.code = `${EErrorCode.DATABASE}-${EDatabase.MSSQL}-${shortEncrypt(this.constructor.name)}`

        setErrorDatabase(error)
        reject(error)
      }
    })
  }
  /**
     * Closes all the pools and removes them from the store
     *
     * @return {Promise<mssql.ConnectionPool[]>}
     */
  public closeAll = (): Promise<mssql.ConnectionPool[]> => Promise.all(
    Array.from(this.pools.values()).map((connect) => connect.then((pool) => pool.close()))
  )
}


export default MSSQL;
