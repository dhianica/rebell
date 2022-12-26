import * as express from 'express';
import { IMSSQLInstance } from '../../core/lib/instance'
import { ECore, EErrorMessage } from '../../core/enum';
class CompanyServiceClass {
  private instance: IMSSQLInstance;
  public constructor() {
    this.instance = new IMSSQLInstance();
  }
  public getAllCompanys = (): Promise<any> => new Promise<any>(async (resolve, reject) => {
    try {
      const connection = await this.instance.connect('company')
      const result = await this.instance.select(connection, {
        table: 'company',
        orderBy: { company_id: 'DESC' }
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  });

  public getCompanyByID = async (id: number): Promise<any> => new Promise<any>(async (resolve, reject) => {
    try {
      const connection = await this.instance.connect('company')
      const result = await this.instance.selectSingle(connection, {
        table: 'company',
        where: { company_id: [id, '=']},
        orderBy: { company_id: 'DESC' }
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  });
}

export const CompanyService = new CompanyServiceClass()
