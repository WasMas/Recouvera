const express = require("express");
const Recovery = require("../models/recovery");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/recoveries:
 *   post:
 *     summary: Register a recovery action
 *     tags: [Recoveries]
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
 *               - client
 *               - type
 *             properties:
 *               invoice:
 *                 type: string
 *                 description: Invoice ID related to the recovery
 *                 example: 665b7c2d9a7a1b001f1b1234
 *               client:
 *                 type: string
 *                 description: Client ID
 *                 example: 665b7c2d9a7a1b001f1b5678
 *               type:
 *                 type: string
 *                 enum: [call, email, letter, visit, legal]
 *                 description: Type of recovery action
 *                 example: call
 *               note:
 *                 type: string
 *                 description: Additional notes about the recovery action
 *                 example: Client promised to pay next week
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date of the recovery action (optional)
 *                 example: 2026-03-12T10:30:00.000Z
 *     responses:
 *       201:
 *         description: Recovery action created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", protect, async (req, res) => {
  try {

    const recovery = await Recovery.create({
      ...req.body,
      agent: req.user._id
    });

    res.status(201).json(recovery);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/recoveries:
 *   get:
 *     summary: Get all recovery actions
 *     tags: [Recoveries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of recovery actions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   invoice:
 *                     type: object
 *                     description: Populated invoice document
 *                   client:
 *                     type: object
 *                     description: Populated client document
 *                   agent:
 *                     type: object
 *                     description: Populated user (agent) document
 *                   type:
 *                     type: string
 *                     enum: [call, email, letter, visit, legal]
 *                   note:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", protect, async (req, res) => {
  try {

    const recoveries = await Recovery.find()
      .populate("client")
      .populate("invoice")
      .populate("agent", "-password");

    res.status(200).json(recoveries);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;