const express = require("express");
const Payment = require("../models/payment");
const Invoice = require("../models/invoice");
const protect = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { createPaymentValidator } = require("../validators/payment.validator");

const router = express.Router();

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Register a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - invoice
 *               - amount
 *             properties:
 *               invoice:
 *                 type: string
 *                 description: Invoice ID
 *               amount:
 *                 type: number
 *               method:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment registered successfully
 */
router.post(
  "/",
  protect,
  validate(createPaymentValidator),
  async (req, res) => {
    try {

      const { invoice, amount, method, note } = req.body;

      const invoiceDoc = await Invoice.findById(invoice);

      if (!invoiceDoc) {
        return res.status(404).json({ message: "Invoice not found" });
      }

      const result = await Payment.aggregate([
        { $match: { invoice: invoiceDoc._id } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);

      const totalPaid = result[0]?.total || 0;
      const newTotal = totalPaid + amount;

      if (newTotal > invoiceDoc.amount) {
        return res.status(400).json({
          message: "Payment exceeds remaining invoice balance",
          remaining: invoiceDoc.amount - totalPaid
        });
      }

      const payment = await Payment.create({
        invoice,
        amount,
        method,
        note
      });

      if (newTotal === invoiceDoc.amount) {
        invoiceDoc.status = "paid";
      } else if (newTotal > 0) {
        invoiceDoc.status = "partial";
      }

      await invoiceDoc.save();

      res.status(201).json(payment);

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments
 */
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

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 */
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