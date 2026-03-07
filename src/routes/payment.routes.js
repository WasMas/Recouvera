const express = require("express");
const Payment = require("../models/payment");
const Invoice = require("../models/invoice");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {

    const { invoice, amount, method, note } = req.body;

    const invoiceDoc = await Invoice.findById(invoice);

    if (!invoiceDoc) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const payment = await Payment.create({
      invoice,
      amount,
      method,
      note
    });

    const payments = await Payment.find({ invoice });

    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    if (totalPaid >= invoiceDoc.amount) {
      invoiceDoc.status = "paid";
    } else if (totalPaid > 0) {
      invoiceDoc.status = "partial";
    }

    await invoiceDoc.save();

    res.status(201).json(payment);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {

    const payments = await Payment.find()
      .populate({
        path: "invoice",
        populate: { path: "client" }
      });

    res.status(200).json(payments);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {

    const payment = await Payment.findById(req.params.id)
      .populate("invoice");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;