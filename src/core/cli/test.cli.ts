import fse from 'fs-extra'
import path from 'path'

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const scripts = () => `
import { expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha';

import App from '../../index';

const type = 'application/json'
const baseUrl = '/api/ClassName/'
describe('Unit Test GET ClassName', (): void => {
  it('should Get All Data', async (): Promise<void> => {
    const res = await request(App).get(baseUrl);
    expect(res.status).to.equal(200);
    expect(res.type).to.equal(type);
    expect(res.body).to.be.an('array');
  });

  it('should Get ClassName By ID ', async (): Promise<void> => {
    const res = await request(App).get(baseUrl+'1');
    expect(res.status).to.equal(200);
    expect(res.type).to.equal(type);
    expect(res.body).to.be.an('object');
  });
});
`

const makeRequest = (name: string): void => {

  // console.log("Model name: ", name)
  if (!name) {
    console.log('name is undefined')
    return
  }

  const importLib = [];
  const file = path.join(`src/app/${name}`, `${name}.controller.spec.ts`)
  if (!fse.existsSync(file))
    fse.ensureFile(file, (errEnsure) => {
      if (errEnsure) {
        console.log('\x1b[31m', 'errEnsure', errEnsure, '\x1b[0m')
        return;
      }

      // change class name from default script
      const content = scripts().replace(/ClassName/g, name.toLowerCase())

      // adding import packages on top of line
      const lines = content.split('\n')
      lines[0] = importLib.join('\n') + lines[0]
      const updatedContent = lines.join('\n')

      fse.writeFile(file, updatedContent, (errWrite) => {
        if (errWrite) {
          console.log('\x1b[31m', 'errWrite', errWrite, '\x1b[0m')
          return;
        }
        console.log('\x1b[32m', `Test created: ${file}`, '\x1b[0m')
      });
    })

  else
    console.log('\x1b[31m', `Test already exists: ${file}`, '\x1b[0m')
}


export default makeRequest
