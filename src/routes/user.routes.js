const express = require("express");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;