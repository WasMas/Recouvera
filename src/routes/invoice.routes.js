const express = require("express");
const Invoice = require("../models/invoice");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/invoices:
 *   post:
 *     summary: Create new invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client
 *               - amount
 *               - dueDate
 *             properties:
 *               client:
 *                 type: string
 *                 description: Client ID
 *               amount:
 *                 type: number
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Invoice created successfully
 */
router.post("/", protect, async (req, res) => {
  try {

    const invoice = await Invoice.create(req.body);

    res.status(201).json(invoice);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of invoices
 */
router.get("/", protect, async (req, res) => {
  try {

    const invoices = await Invoice.find().populate("client");

    res.status(200).json(invoices);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoices]
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
 *         description: Invoice retrieved successfully
 */
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

/**
 * @swagger
 * /api/invoices/{id}:
 *   put:
 *     summary: Update invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 */
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

/**
 * @swagger
 * /api/invoices/{id}:
 *   delete:
 *     summary: Delete invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", protect, async (req, res) => {
  try {

    await Invoice.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Invoice deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;