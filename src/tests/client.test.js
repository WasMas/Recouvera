jest.setTimeout(20000);

const request = require("supertest");
const app = require("../app");
const getToken = require("./helpers/auth");

describe("Client API", () => {

let token;

beforeAll(async () => {
  token = await getToken();
});

test("should create a client", async () => {

  const res = await request(app)
    .post("/api/clients")
    .set("Authorization", "Bearer " + token)
    .send({
      name: "Wassim",
      email: "wassim@test.com",
      phone: "12345678"
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.name).toBe("Wassim");

});

});