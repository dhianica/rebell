import { expect } from "chai";
import { agent as request } from "supertest";
import "mocha";

import App from "../../index";

describe("Unit Test Product", () => {
  it("should GET", async () => {
    const res = await request(App).get("/api/products/");
    expect(res.status).to.equal(200);
    expect(res.type).to.equal("application/json");
    expect(res.body).to.be.an("array");
  });
    it("should POST", async () => {
      const res = await request(App).get("/api/products/");
      expect(res.status).to.equal(200);
      expect(res.type).to.equal("application/json");
      expect(res.body).to.be.an("array");
    });
});
