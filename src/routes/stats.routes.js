const express = require("express");
const protect = require("../middlewares/auth.middleware");

const Client = require("../models/client");
const Invoice = require("../models/invoice");
const Payment = require("../models/payment");

const router = express.Router();

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get system statistics
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System statistics
 */
router.get("/", protect, async (req, res) => {
  try {

    const totalClients = await Client.countDocuments();

    const totalInvoices = await Invoice.countDocuments();

    const paidInvoices = await Invoice.countDocuments({ status: "paid" });

    const pendingInvoices = await Invoice.countDocuments({ status: "pending" });

    const partialInvoices = await Invoice.countDocuments({ status: "partial" });

    const overdueInvoices = await Invoice.countDocuments({ status: "overdue" });

    const payments = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRecovered: { $sum: "$amount" }
        }
      }
    ]);

    const totalRecovered = payments.length > 0 ? payments[0].totalRecovered : 0;

    res.status(200).json({
      totalClients,
      totalInvoices,
      paidInvoices,
      pendingInvoices,
      partialInvoices,
      overdueInvoices,
      totalRecovered
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;