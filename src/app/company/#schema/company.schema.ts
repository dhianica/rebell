/**
 * employeeCreateSchema
 * validate request create data employee
 * Sample Data like this
 * {
 *      name: 'Muchammad Ilham',
 *      division: 'System Development',
 *      title: 'Senior'
 * }
 */

import { SchemaObject } from 'ajv';

export const Company: SchemaObject = {
  type: 'object',
  required: ['company_name'],
  properties: {
    company_name: {
      type: 'string'
    },
    company_address: {
      type: 'string'
    },
    company_city: {
      type: 'string'
    },
    company_province: {
      type: 'string'
    },
    company_postal_code: {
      type: 'string'
    },
    company_phonenumber: {
      type: 'string'
    },
    company_email: {
      type: 'string'
    }
  },
  additionalProperties: false,
  errorMessage: {
    type: 'data should be an object',
    properties: {
      company_name: 'company name should be string',
      company_address: 'company address should be string',
      company_city: 'company city should be string',
      company_province: 'company province should be string',
      company_postal_code: 'company postal_code should be string',
      company_phonenumber: 'company phonenumber should be string',
      company_email: 'company email should be string'
    },
    _: 'data should have properties "company_name"'
  }
}
