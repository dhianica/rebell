import mssql from 'mssql'
import { Configuration } from '../../configuration'
import { IConfiguration } from '../../types';
const configuration = Configuration.get('MSSQL') as IConfiguration
class MSSQL {
  private pools = new Map();

  public constructor(name: string) {
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
