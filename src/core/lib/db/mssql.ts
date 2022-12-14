import dayjs from 'dayjs'
import mssql, { type ConnectionPool, type Request } from 'mssql'
import { Configuration } from '../../configuration'
import { IConfiguration } from '../../types';
import { isEmpty, objectEntries } from '../../../utils/index.util'
import { Format } from '../../enum'
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

  public async request(req: any, parameter: any): Promise<void> {
    parameter.forEach(params => {
      const keys = Object.keys(params)[0]
      const values = Object.values(params)[0]
      req.input(keys, values)
    })
  }

  public async execute(req: ConnectionPool, sp: string, parameter?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!isEmpty(parameter))
          await this.request(req.request(), parameter)
        const result = await req.request().execute(sp)
        console.log(result.recordset.columns)
        // eslint-disable-next-line guard-for-in
        for ( const [key, value ] of objectEntries(result.recordset.columns))
          if (value.type === mssql.Int) {
            Object.keys(result.recordset).forEach((k: string) =>{
              if (key === k)
                result.recordset[key] = parseInt(result.recordset[key], 10)
            });
          } else if (value.type === mssql.DateTime) {
            console.log(value.type)
            Object.keys(result.recordset).forEach((k: string) =>{
              if (key === k)
                result.recordset[key] = dayjs(result.recordset[key], Format.DateUTC).format(Format.DateString)
            });
          }

        resolve(result.recordset)
      } catch (error) {
        reject(error)
      }
    })

  }
  public async query(req: ConnectionPool, query: string, parameter?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!isEmpty(parameter))
          await this.request(req, parameter)
        const result = await req.query(query)
        resolve(result.recordset)
      } catch (error) {
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
