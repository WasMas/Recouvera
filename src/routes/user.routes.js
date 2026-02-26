const express = require("express");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get("/profile", protect, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;