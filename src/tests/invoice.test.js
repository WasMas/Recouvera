jest.setTimeout(20000);

const request = require("supertest");
const app = require("../app");
const getToken = require("./helpers/auth");

describe("Invoice API", () => {

let token;
let clientId;

beforeAll(async () => {

  token = await getToken();

  const client = await request(app)
    .post("/api/clients")
    .set("Authorization", "Bearer " + token)
    .send({
      name: "Client Test",
      email: "client@test.com",
      phone: "12345678"
    });

  clientId = client.body._id;

});

test("should create an invoice", async () => {

  const res = await request(app)
    .post("/api/invoices")
    .set("Authorization", "Bearer " + token)
    .send({
      client: clientId,
      amount: 500,
      dueDate: "2026-12-01"
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.amount).toBe(500);

});

});