import { AnySchemaObject } from 'ajv'
import { type IResult } from 'mssql'
import {
  ERoles,
  EPermissions,
  EHttpMethods,
  type EHttpStatusCode, type EStatus, type ESuccessMessage, type EErrorMessage } from './enum'
export interface IConfiguration {
  name: string;
  value: string;
}

export interface IEncryptTypes {
  key: string;
  encryptedText: string;
  iv: Buffer | string;
}

export interface IError {
  errorCode: string;
  message: string;
  errorPath: string;
}

export interface Auth {
    [ERoles.SUPERADMINISTRATOR]: EPermissions.READ | EPermissions.WRITE | EPermissions.EDIT | EPermissions.DELETE | EPermissions.EXECUTE;
    [ERoles.ADMINISTRATOR]: EPermissions.READ | EPermissions.WRITE | EPermissions.EDIT | EPermissions.DELETE;
    [ERoles.USER]: EPermissions.READ | EPermissions.WRITE | EPermissions.EDIT;
    [ERoles.GUEST]: EPermissions.READ;
}

export interface IResponseTypes {
  statusCode: EHttpStatusCode;
  status: EStatus;
  message: ESuccessMessage | EErrorMessage;
  errorMessage: any;
  errorCode: any;
  detail?: any;
}

export interface IRouterTypes {
  method: EHttpMethods;
  path: string;
  handlerName: string | symbol;
}

export interface ISchemaTypes {
  schema: AnySchemaObject;
  schemaName: string;
}

export interface ISocketClient {
  customId: string;
  clientId: string;
  connectTime: string;
}

export interface IDB {
  prepareSelect<T>(connection: any, options: IDBOptions): Promise<IResult<T>>;
  select<T>(options: IDBOptions): Promise<T[]>;
  single<T>(options: IDBOptions): Promise<T>;
  singleOrDefault<T>(options: IDBOptions): Promise<T>;
  insert<T>(options: IDBOptions): Promise<boolean>;
  insertWithDefault<T>(options: IDBOptions): Promise<T>;
  update<T>(options: IDBOptions): Promise<T>;
  delete<T>(options: IDBOptions): Promise<T>;
  execute<T>(sp: string, paramaters?: any): Promise<T>;
}

export interface IDBOptions {
  table: string;
  columns?: any;
  where?: any;
  value?: any;
  limit?: number;
  orderBy?: any;
  paginate?: {
    offset?: number;
    fetch?: number;
  };

}

export interface IDBHelper {
  querySelect(options: IDBOptions, DBType: string): Promise<string>;
  queryInsert(options: IDBOptions, DBType: string): Promise<string>;
  queryUpdate(options: IDBOptions, DBType: string): Promise<string>;
  queryDelete(options: IDBOptions, DBType: string): Promise<string>;
  addAttributeClauses(options: IDBOptions): string;
  addWhereClauses(options: IDBOptions): string;
  addWhereClausesAdvance(options: IDBOptions): string;
  addOrderByClauses(options: IDBOptions): string;
}
