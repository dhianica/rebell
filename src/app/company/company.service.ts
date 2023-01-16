import type { Request } from 'express';
import { IMSSQLInstance } from '../../core/lib/instance'
import { isEmpty, stringToArray } from '../../utils/index.util';
import { IDBOptions } from '../../core/interface';
class CompanyServiceClass {
  private instance: IMSSQLInstance;
  public constructor(private name: string) {
    this.instance = new IMSSQLInstance(this.name);
  }
  public get = (request?: Request): Promise<any> => new Promise<any>(async (resolve, reject) => {
    try {
      await this.instance.connect()
      const options = {
        table: 'company'
      } as IDBOptions

      if (!isEmpty(request.query))
        options.columns = stringToArray(request.query.columns.toString())

      const result = await this.instance.select(options)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  });

  public getByID = async (request: Request, id: number): Promise<any> => new Promise<any>(async (resolve, reject) => {
    try {
      await this.instance.connect()
      const options = {
        table: 'company',
        columns: request.query.columns,
        where: { company_id: [id, '=']}
      } as IDBOptions

      const result = await this.instance.single(options)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  });

  public insert = async (data: any): Promise<any> => new Promise<any>(async (resolve, reject) => {
    try {
      await this.instance.connect()
      const result = await this.instance.insert({
        table: 'company',
        columns: {
          company_name: data.company_name,
          company_address: data.company_address,
          company_city: data.company_city,
          company_province: data.company_province,
          company_postal_code: data.company_postal_code,
          company_phonenumber: data.company_phonenumber,
          company_email: data.company_email
        }
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  });

  public insertWithDefault = async (data: any): Promise<any> => new Promise<any>(async (resolve, reject) => {
    try {
      await this.instance.connect()
      const result = await this.instance.insertWithDefault({
        table: 'company',
        columns: {
          company_name: data.company_name,
          company_address: data.company_address,
          company_city: data.company_city,
          company_province: data.company_province,
          company_postal_code: data.company_postal_code,
          company_phonenumber: data.company_phonenumber,
          company_email: data.company_email
        }
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  });
}

export const CompanyService = new CompanyServiceClass('company')
