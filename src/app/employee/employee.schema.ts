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

export const schema = {
  $async: true,
  required: ['name', 'division'],
  allOf: [
    {
      properties: {
        name: {
          type: 'string'
        },
        division: {
          type: 'string'
        },
        title: {
          type: 'string'
        }
      },
      additionalProperties: false
    }
  ],
  errorMessage: {
    type: 'data should be an object',
    properties: {
      name: 'name should be string',
      division: 'division should be string'
    },
    _: 'data should have properties "name" and "division"'
  }
}
