jest.setTimeout(20000);

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Invoice = require("../models/invoice");
const getToken = require("./helpers/auth");
const { NotBeforeError } = require("jsonwebtoken");

let token;
let invoiceId;

beforeAll(async () => {
    token = await getToken();

    const invoice = await Invoice.create({
        client: new mongoose.Types.ObjectId(),
        amount: 1000,
        status: "pending",
        note: "Test invoice",
        dueDate: new Date(Date.now()+24*60*60*1000) // Set date to tomorrow to avoid "Invoice date cannot be in the past" error
    });


    invoiceId = invoice._id;
});

test("Should create payment", async () => {

        const res = await request(app)
        .post("/api/payments")
        .set("Authorization", "Bearer " + token)
        .send({

            invoice: invoiceId,
            amount: 200,
            method: "manual",
            note: "Partial payment"
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.amount).toBe(200);
    });


    it("should fail if invoice does not exist", async () => {
        const res = await request(app)
        .post("/api/payments")
        .set("Authorization", "Bearer " + token)
        .send({
            invoice: new mongoose.Types.ObjectId(),
            amount: 100
        });
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Invoice not found");
    });
    it("should fail if payment exceeds invoice balance", async () => {
        const invoice = await Invoice.create({
            client: new mongoose.Types.ObjectId(),
            amount: 500,
            status: "pending",
            note: "Test invoice",
            dueDate: new Date(Date.now()+24*60*60*1000) // Set date to tomorrow to avoid "Invoice date cannot be in the past" error
        });
        const res = await request(app)
        .post("/api/payments")
        .set("Authorization", "Bearer " + token)
        .send({
            invoice: invoice._id,
            amount: 600,
            method: "manual",
            note: "Full payment"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Payment amount exceeds invoice balance");
    });
    it("should update invoice status to paid when full amount is paid", async () => {
        const invoice = await Invoice.create({
            client: new mongoose.Types.ObjectId(),
            amount: 500,
            status: "pending",
            note: "Test invoice",
            dueDate: new Date(Date.now()+24*60*60*1000) // Set date to tomorrow to avoid "Invoice date cannot be in the past" error
        });
        const res = await request(app)
        .post("/api/payments")
        .set("Authorization", "Bearer " + token)
        .send({
            invoice: invoice._id,
            amount: 500,
            method: "manual",
            note: "Full payment"
        });
        expect(res.statusCode).toBe(201);
    });
    it("should fail if invoice is already paid", async () => {
        const invoice = await Invoice.create({
            client: new mongoose.Types.ObjectId(),
            amount: 100,
            status: "paid",
            note: "Test invoice",
            dueDate: new Date(Date.now()+24*60*60*1000) // Set date to tomorrow to avoid "Invoice date cannot be in the past" error
        });
        const res = await request(app)
        .post("/api/payments")
        .set("Authorization", "Bearer " + token)
        .send({
            invoice: invoice._id,
            amount: 50,
            method: "manual",
            note: "Partial payment"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Invoice is already paid");
    });