import { camelCase, isEmpty } from './utilities.util'
import mssql from 'mssql'
import dayjs from 'dayjs'
import { Format } from '../core/enum';

export function setUrlRoute(basePath: string, subPath: string): string {
  return `${basePath}${/\/[^/]*.*\.*\//.exec(subPath)![0]}`;
}
export function setSchemaName(name: string): string {
  return camelCase(`${/\/[^\/]*.#*\.*\//.exec(name)![0]}`).replace(/[.*+?^${}()\/]/g, '');
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
      reject(error)
    }
  })
}


export async function wrappingMSSQL(recordsets: any, coloumns: any): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      recordsets.forEach(x => {
        coloumns.forEach((y) => {
          const found = x[y.name] === y.name
          if (y.type === mssql.Int && found && !isEmpty(x[y.name])) x[y.name] = parseInt(x[y.name], 10)
          else if (y.type === mssql.DateTime && found && !isEmpty(x[y.name])) x[y.name] = dayjs(x[y.name]).format(Format.DateString)
          else if (y.type === mssql.Bit && found && !isEmpty(x[y.name])) x[y.name] = parseInt(x[y.name], 10) === 1 ? true: false
        })
      })
      resolve(recordsets)
    } catch (error) {
      reject(error)
    }
  })
}
