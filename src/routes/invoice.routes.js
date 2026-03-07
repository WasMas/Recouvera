const express = require("express");
const Invoice = require("../models/invoice");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {

    const invoice = await Invoice.create(req.body);

    res.status(201).json(invoice);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {

    const invoices = await Invoice.find().populate("client");

    res.status(200).json(invoices);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {

    const invoice = await Invoice.findById(req.params.id).populate("client");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(invoice);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {

    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(invoice);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {

    await Invoice.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Invoice deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;