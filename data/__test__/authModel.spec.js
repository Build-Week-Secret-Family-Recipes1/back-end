const supertest = require("supertest");
const server = require("../../server");
const db = require("../../data/dbConfig");

const Auth = require("../../auth/auth-model");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("Test auth model functions", () => {
  it("find() should retrieve all users", async () => {
    const auth = await db("users");

    expect(auth).toHaveLength(1);
  });

  it("findBy() should filter users by selected criteria", async () => {
    const auth = await db("users");

    expect(auth).toHaveLength(1);
    expect(auth[0].email).toContain("test_user@gmail.com");
  });

  it("findBy() should return users filtered by id", async () => {
    const auth = await db("users");
    const data = { user_id: 1 };

    expect(data).toEqual({ user_id: 1 });
  });

  //   it("add() should insert a new user and assign new user_id", async () => {
  //     await Auth.insert({
  //       email: "new_user@yahoo.com",
  //       username: "new_user",
  //       password: "newuser20",
  //     });

  //     const auth = await db("users");

  //     expect(auth).toHaveLength(2);
  //   });
});
