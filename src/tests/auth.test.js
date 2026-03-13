jest.setTimeout(20000);

const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {

test("should register a user", async () => {

  const res = await request(app)
    .post("/api/auth/signup")
    .send({
      first_name: "Test",
      last_name: "User",
      email: "test@mail.com",
      password: "123456"
    });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("userId");

});

});