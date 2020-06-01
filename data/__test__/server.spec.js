const supertest = require("supertest");
const server = require("../../server");

test("GET /", async () => {
  const endpoint = "/api";
  const status = 200;

  const res = await supertest(server).get(endpoint);
  expect(res.statusCode).toBe(status);
  expect(res.type).toBe("text/html");
});
