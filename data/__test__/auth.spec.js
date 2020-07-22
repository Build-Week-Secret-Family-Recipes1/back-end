const supertest = require("supertest");
const server = require("../../server");
const db = require("../../data/dbConfig");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("Tests register/login/logout functionality", () => {
  it("POST /register", async () => {
    const status = 201;
    const data = {
      user_id: 2,
      email: "test_user2@gmail.com",
      username: "test_user2",
      password: "testuser2020",
    };
    const res = await supertest(server).post("/api/auth/register").send(data);
    expect(res.statusCode).toBe(status);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("test_user2");
  });

  it("POST /login", async () => {
    const status = 201;
    const data = {
      email: "test_user@gmail.com",
      password: "testuser20",
    };
    const res = await supertest(server).post("/api/auth/login").send(data);
    expect(res.statusCode).toBe(status);
    expect(res.type).toBe("application/json");
    expect(data.password).toBe("testuser20");
  });

  it("GET /logout", async () => {
    const res = await supertest(server).get("/api/auth/logout");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
  });
});
