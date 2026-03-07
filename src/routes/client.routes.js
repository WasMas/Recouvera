const express = require("express");
const Client = require("../models/client");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", protect, async (req, res) => {
  try {

    const client = await Client.create(req.body);

    res.status(201).json(client);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", protect, async (req, res) => {
  try {

    const clients = await Client.find();

    res.status(200).json(clients);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Get client by ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", protect, async (req, res) => {
  try {

    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(client);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Update client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", protect, async (req, res) => {
  try {

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(client);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", protect, async (req, res) => {
  try {

    await Client.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Client deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;