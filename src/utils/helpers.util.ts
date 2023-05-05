import { camelCase, generateCode, isValidDate } from 'rebell-utils'
// import mssql from 'mssql'
import dayjs from 'dayjs'
import { EErrorCode, EFormat, ECore, EACTION, EErrorMessage, setError } from 'rebell-core';
import dotenv from 'dotenv'

dotenv.config()

export function setUrlRoute(basePath: string, subPath: string): string {
  return `${basePath}${/\/[^/]*.*\.*\//.exec(subPath)![0]}`;
}
export function setSchemaName(name: string): string {
  return camelCase(`${/\/[^\/]*.#*\.*\//.exec(name)![0]}`).replace(/[.*+?^${}()\/]/g, '');
}

// export function getColumnMSSQL(columns: any): any {
//   try {
//     return Object.values(columns).map(({ index, name, length, type }) => ({
//       name,
//       index,
//       type,
//       length }))
//   } catch (error) {
//     error.errorCode= `${EErrorCode.OTHER}-${ECore.UTILS_HELPERS}-${generateCode(4)}`
//     error.errorMessage = error.message
//     error.message = EErrorMessage.INVALID_SYNTAX
//     setError(error)
//     throw error
//   }
// }


// export function wrappingDataMSSQL(recordsets: any, column: any): any {
//   try {
//     recordsets.forEach(x => {
//       column.forEach((y) => {
//         const found = Object.keys(x).find(z => z === y.name)
//         if (y.type === mssql.Int && found)
//           x[y.name] = parseInt(x[y.name], 10)
//         else if (y.type === mssql.DateTime && found && isValidDate(x[y.name]))
//           x[y.name] = dayjs(x[y.name], EFormat.DateUTC).format(EFormat.DateString)
//         else if (y.type === mssql.Bit && found)
//           x[y.name] = parseInt(x[y.name], 10) === 1 ? true: false
//       })
//     })
//     return recordsets
//   } catch (error) {
//     error.errorCode= `${EErrorCode.OTHER}-${ECore.UTILS_HELPERS}-${generateCode(4)}`
//     error.errorMessage = error.message
//     error.message= EErrorMessage.INVALID_SYNTAX
//     setError(error)
//     throw error
//   }
// }
