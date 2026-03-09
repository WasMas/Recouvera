const express = require("express");
const Recovery = require("../models/recovery");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/recoveries:
 *   post:
 *     summary: Register recovery action
 *     tags: [Recoveries]
 *     security:
 *       - bearerAuth: []
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