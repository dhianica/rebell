import { camelCase, isValidDate } from './utilities.util'
import mssql from 'mssql'
import dayjs from 'dayjs'
import { EErrorCode, EFormat, ECore, EACTION } from '../core/enum';
import { shortEncrypt } from '../core/crypto/encrypt'
import dotenv from 'dotenv'

dotenv.config()

export function setUrlRoute(basePath: string, subPath: string): string {
  return `${basePath}${/\/[^/]*.*\.*\//.exec(subPath)![0]}`;
}
export function setSchemaName(name: string): string {
  return camelCase(`${/\/[^\/]*.#*\.*\//.exec(name)![0]}`).replace(/[.*+?^${}()\/]/g, '');
}

export class mssqlHelper {
  public static addAttributeClauses(options: any): string{
    if (!options) return '*'
    if (!options.column) return '*'
    if (options.column.length < 1) return '*'

    return options.column.join(',\n')
  }

  public static addWhereClauses(options: any): string {
    if (!options) return null
    if (!options.where) return null
    if (Object.keys(options.where).length === 0) return null

    const whereClauses = []
    for (const column in options.where)
      if (Object.hasOwnProperty.call(options.where, column)) {
        const value = options.where[column];

        if (typeof value === 'string')
          whereClauses.push(`${column}='${value}'`)
        else whereClauses.push(`${column}=${value}`)
      }

    return whereClauses.join(' AND ')
  }

  public static addWhereClausesAdvance(options: any): string {
    if (!options) return null
    if (!options.where) return null
    if (Object.keys(options.where).length === 0) return null
    let totalCondition = false
    if ((Object.keys(options.where).length > 1)) totalCondition = true
    const whereClauses = []
    for (const column in options.where)
      if (Object.hasOwnProperty.call(options.where, column)) {
        let where = ''
        const value = options.where[column][0];
        const condition = options.where[column][1];
        const bitwise = options.where[column][2] || 'AND';

        if (condition.toLowerCase() === 'like')
          where = `${column} LIKE '%@${column}%'`
        else
          where = `${column} ${condition} @${column}`

        if (totalCondition)
          where += ` ${bitwise} `

        whereClauses.push(where)
      }

    return whereClauses.join(' ').replace(/AND $|OR $/, '')
  }

  public static addOrderByClauses(options: any): string{
    if (!options) return null
    if (!options.orderBy) return null

    const orderByClauses = []
    for (const column in options.orderBy)
      if (Object.hasOwnProperty.call(options.orderBy, column)) {
        const value = options.orderBy[column];

        if (value === 'ASC') orderByClauses.push(`${column} ASC`)
        if (value === 'DESC') orderByClauses.push(`${column} DESC`)
      }


    return orderByClauses.join(', ')
  }

  public static addInsertSQL(payload: any): any{
    const columns = []
    const values = []

    for (const column in payload)
      if (Object.hasOwnProperty.call(payload, column)) {
        const value = payload[column];

        columns.push(column)
        if (typeof value === 'string')
          values.push(`'${value}'`)
        else values.push(`${value}`)
      }


    return { columns, values }
  }

  public static queryInsert(columns: string, table: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let query = `INSERT INTO ${table} (${columns})`
        const values = columns.split(',').map((x) => `@${x}`).join()
        query += `${values}`
        resolve(query)
      } catch (error) {
        reject({
          code: `${EErrorCode.OTHER}-${ECore.UTILS}-${shortEncrypt(this.constructor.name)}`,
          message: error.message
        })
      }
    })
  }
  public static querySelect(columns: string, table: string, where?: string, options?: {
    orderBy?: string;
    paginate?: {
      offset?: number;
      fetch?: number;
    };
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let query = `SELECT ${columns}`

        query += `\nFROM ${table}`

        if (where) query += `\nWHERE ${where}`

        if (options.orderBy) {
          query += `\nORDER BY ${options.orderBy}`
          if (options.paginate) {
            if (!options.paginate.offset) options.paginate.offset = 0
            query += `\nOFFSET ${options.paginate.offset} ROWS`

            if (!options.paginate.fetch) options.paginate.fetch = 10
            query += `\nFETCH NEXT ${options.paginate.fetch} ROWS ONLY`
          }
        }
        resolve(query)
      } catch (error) {
        reject({
          code: `${EErrorCode.OTHER}-${ECore.UTILS}-${shortEncrypt(this.constructor.name)}`,
          message: error.message
        })
      }
    })
  }
  public static queryDelete(table: string, where?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let query = `DELETE FROM ${table}`
        if (where) query += ` WHERE ${where}`
        resolve(query)
      } catch (error) {
        reject({
          code: `${EErrorCode.OTHER}-${ECore.UTILS}-${shortEncrypt(this.constructor.name)}`,
          message: error.message
        })
      }
    })
  }
  public static queryUpdate(columns: string, table: string, where?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let query = `UPDATE a \n`
        query += 'SET\n'
        query += columns.split(',').map((x) => `    ${x} = @${x}`).join(',\n')
        if (where) query += `\nWHERE ${where}`
        resolve(query)
      } catch (error) {
        reject({
          code: `${EErrorCode.OTHER}-${ECore.UTILS}-${shortEncrypt(this.constructor.name)}`,
          message: error.message
        })
      }
    })
  }
}

export async function getColoumnMSSQL(columns: any): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const result = Object.values(columns).map(({ index, name, length, type }) => ({
        name,
        index,
        type,
        length }))
      resolve(result)
    } catch (error) {
      reject({
        code: `${EErrorCode.OTHER}-${ECore.UTILS}-${shortEncrypt(this.constructor.name)}`,
        message: error.message
      })
    }
  })
}


export async function wrappingDataMSSQL(recordsets: any, column: any): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      recordsets.forEach(x => {
        column.forEach((y) => {
          const found = Object.keys(x).find(z => z === y.name)
          if (y.type === mssql.Int && found)
            x[y.name] = parseInt(x[y.name], 10)
          else if (y.type === mssql.DateTime && found && isValidDate(x[y.name]))
            x[y.name] = dayjs(x[y.name], EFormat.DateUTC).format(EFormat.DateString)
          else if (y.type === mssql.Bit && found)
            x[y.name] = parseInt(x[y.name], 10) === 1 ? true: false
        })
      })
      resolve(recordsets)
    } catch (error) {
      reject({
        code: `${EErrorCode.OTHER}-${ECore.UTILS}-${shortEncrypt(this.constructor.name)}`,
        message: error.message
      })
    }
  })
}
