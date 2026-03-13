jest.setTimeout(20000);

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Invoice = require("../models/invoice");
const User = require("../models/user");
const Client = require("../models/client");
const getToken = require("./helpers/auth");
const { date } = require("joi");


describe("Recovery API", () => {
let token;
let clientId;
let invoiceId;
let agentId;

beforeAll(async () => {

    token = await getToken();


    const client = await Client.create({
        name: "Wassim",
        email: "wassim@test.com",
        phone: "12345678"
    });


    clientId = client._id;
    const agent = await User.create({
        first_name: "Agent GLSI",
        last_name: "Test",
        email: "agent@test.com",
        password: "123456",
        roles: "agent"
});
agentId = agent._id;

const invoice = await Invoice.create({
    client: clientId,
    amount: 1000,
    status: "pending",
    dueDate: new Date(Date.now()+24*60*60*1000) ,// Set date to tomorrow to avoid "Invoice date cannot be in the past" error,
    note: "Test invoice"
});
invoiceId = invoice._id;

});

test("shouuld create a recovery action", async () => {
    const res = await request(app)
        .post("/api/recoveries")
        .set("Authorization", "Bearer " + token)
        .send({
            invoice: invoiceId,
            client: clientId,
            agent: agentId,
            type: "call",
            note: "Called the client about unpaid invoice",
            date: new Date()
        });
        expect(res.statusCode).toBe(201);
    });

    


test("should get all recovery actions", async () => {
    const res = await request(app)
    .get("/api/recoveries")
    .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toBe(200);
});
});