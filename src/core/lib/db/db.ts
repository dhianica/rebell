import { generateCode, isString, stringToArray } from '../../../utils/index.util'
import { EErrorCode, EErrorMessage } from '../../enum';
import { setError } from '../../error';
import { IDBOptions } from '../../interface'
export abstract class DBHelper {
    public abstract DBType: string;
    public abstract DBPath: string;
    public addAttributeClauses(options: IDBOptions): string {
      if (!options) return '*'
      if (!options.columns) return '*'
      if (options.columns.length < 1) return '*'

      if (isString(options.columns))
        options.columns = stringToArray(options.columns.toString())

      return options.columns.join(',\n')
    }
    public addWhereClauses(options: IDBOptions): string {
      try {
        const whereClauses = []
        for (const column in options.where)
          if (Object.hasOwnProperty.call(options.where, column)) {
            const value = options.where[column];

            if (typeof value === 'string')
              whereClauses.push(`${column}='${value}'`)
            else whereClauses.push(`${column}=${value}`)
          }

        return whereClauses.join(' AND ')
      } catch (error) {
        error.errorCode= `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`
        error.errorMessage = error.message
        error.message= EErrorMessage.INVALID_SYNTAX
        setError(error)
        throw error
      }
    }
    public addWhereClausesAdvance(options: IDBOptions): string {
      try {
        let totalCondition = false
        if ((Object.keys(options.where).length > 1)) totalCondition = true
        const whereClauses = []
        for (const column in options.where)
          if (Object.hasOwnProperty.call(options.where, column)) {
            let where = ''
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
      } catch (error) {
        error.errorCode= `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`
        error.errorMessage = error.message
        error.message= EErrorMessage.INVALID_SYNTAX
        setError(error)
        throw error
      }
    }
    public addOrderByClauses(options: IDBOptions): string {
      try {
        const orderByClauses = []
        for (const column in options.orderBy)
          if (Object.hasOwnProperty.call(options.orderBy, column)) {
            const value = options.orderBy[column];

            if (value === 'ASC') orderByClauses.push(`${column} ASC`)
            if (value === 'DESC') orderByClauses.push(`${column} DESC`)
          }


        return orderByClauses.join(', ')
      } catch (error) {
        error.errorCode= `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`
        error.errorMessage = error.message
        error.message= EErrorMessage.INVALID_SYNTAX
        setError(error)
        throw error
      }
    }
    public querySelect(options: IDBOptions): Promise<string> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.query(options))
        } catch (error) {
          reject({
            errorCode: `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`,
            message: error.message
          })
        }
      })
    }
    public queryInsert(options: IDBOptions): Promise<string> {
      return new Promise((resolve, reject) => {
        try {
          let query = `INSERT INTO ${options.table} `
          const setColumn = []
          const setVarColumn = []
          for (const column in options.columns)
            if (Object.hasOwnProperty.call(options.columns, column)) {
              setColumn.push(column)
              setVarColumn.push(`@${column}`)
            }
          query += `(${setColumn.join(', ')}) VALUES (${setVarColumn.join(', ')})`
          resolve(query)
        } catch (error) {
          reject({
            errorCode: `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`,
            message: error.message
          })
        }
      })
    }
    public queryUpdate(options: IDBOptions): Promise<string> {
      return new Promise((resolve, reject) => {
        try {
          let query = `UPDATE ${options.table} \n`
          query += 'SET\n'
          query += options.columns.map((x) => `    ${x} = @${x}`).join(',\n')
          if (options.where) query += `\nWHERE ${options.where}`
          resolve(query)
        } catch (error) {
          reject({
            errorCode: `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`,
            message: error.message
          })
        }
      })
    }
    public queryDelete(options: IDBOptions): Promise<string> {
      return new Promise((resolve, reject) => {
        try {
          let query = `DELETE FROM ${options.table}`
          if (options.where) query += ` WHERE ${options.where}`
          resolve(query)
        } catch (error) {
          reject({
            errorCode: `${EErrorCode.DATABASE}-${this.DBType}-${generateCode(4)}`,
            message: error.message
          })
        }
      })
    }
    public abstract query(options: IDBOptions): string;
}

