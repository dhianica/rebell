import * as express from 'express';
import { IMSSQLInstance } from '../../core/lib/instance'
class CompanyServiceClass {
  private instance: IMSSQLInstance;
  public constructor() {
    this.instance = new IMSSQLInstance();
  }
  public getAllCompanys = (): Promise<any> => new Promise<any>(async (resolve, reject) => {
    try {
      const connection = await this.instance.connect('company')
      const result = await this.instance.execute(connection, 'sp__company_getAll')
      resolve(result)
    } catch (error) {
      reject(error)
    }
  });
}

export const CompanyService = new CompanyServiceClass()
