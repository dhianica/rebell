import { expect } from 'chai';
import { agent as request } from 'supertest';
import 'mocha';

import App from '../../index';

const type = 'application/json'
const baseUrl = '/api/company/'
describe('Unit Test GET Company', (): void => {
  it('should Get All Data', async (): Promise<void> => {
    const res = await request(App).get(baseUrl);
    expect(res.status).to.equal(200);
    expect(res.type).to.equal(type);
    expect(res.body).to.be.an('array');
  });

  it('should Get By ID ', async (): Promise<void> => {
    const res = await request(App).get(`${baseUrl}1`);
    expect(res.status).to.equal(200);
    expect(res.type).to.equal(type);
    expect(res.body).to.be.an('object');
  });
});
