
import { AnySchemaObject } from 'ajv'
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
  select<T>(connection: any, options: IDBOptions): Promise<T[]>;
  selectSingle<T>(connection: any, options: IDBOptions): Promise<T>;
  selectSingleOrDefault<T>(connection: any, options: IDBOptions): Promise<T> | Promise<any>;
  insert<T>(connection: any, options: IDBOptions): Promise<boolean>;
  insertWithDefault<T>(connection: any, options: IDBOptions): Promise<T>;
  update<T>(connection: any, options: IDBOptions): Promise<T>;
  delete<T>(connection: any, options: IDBOptions): Promise<T>;
  execute<T>(connection: any, sp: string, paramaters?: any): Promise<T>;
}

export interface IDBOptions {
  table: string;
  columns?: any;
  where?: any;
  value?: any;
  orderBy?: any;
  paginate?: {
    offset?: number;
    fetch?: number;
  };

}

export interface IDBHelper {
  querySelect<T>(options: IDBOptions, DBType: string): Promise<T[]>;
  querySelectSingle<T>(options: IDBOptions, DBType: string): Promise<T>;
  queryInsert<T>(options: IDBOptions, DBType: string): Promise<T>;
  queryUpdate<T>(options: IDBOptions, DBType: string): Promise<T>;
  queryDelete<T>(options: IDBOptions, DBType: string): Promise<T>;
  addAttributeClauses(options: IDBOptions): string;
  addWhereClauses(options: IDBOptions): string;
  addWhereClausesAdvance(options: IDBOptions): string;
  addOrderByClauses(options: IDBOptions): string;
}
