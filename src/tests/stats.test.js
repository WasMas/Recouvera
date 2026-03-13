jest.setTimeout(20000);

const request = require("supertest");
const app = require("../app");
const getToken = require("./helpers/auth");

let token;

beforeAll(async () => {

    token = await getToken();
});

describe("Stats API", () => {
    it("should return statistics", async () => {
    const res = await request(app)
    .get("/api/stats")
    .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("totalClients");
    expect(res.body).toHaveProperty("totalInvoices");
    expect(res.body).toHaveProperty("pendingInvoices");
    expect(res.body).toHaveProperty("paidInvoices");
    expect(res.body).toHaveProperty("partialInvoices");
    expect(res.body).toHaveProperty("overdueInvoices");
    expect(res.body).toHaveProperty("totalRecovered");});

});