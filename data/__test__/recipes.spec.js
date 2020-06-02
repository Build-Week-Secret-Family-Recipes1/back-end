const request = require("supertest");
const mockSession = require("mock-session");
const server = require("../../server");
const db = require("../../data/dbConfig");

let cookie = mockSession("family-recipes", "keep it secret, keep it safe", {
  user: true,
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("Tests recipe endpoint functionality", () => {
  it("GET /", async () => {
    // console.log(cookie);
    const res = await request(server)
      .get("/api/recipes")
      .set("cookie", [cookie]);

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
  });
});
