const express = require("express");
import { createClient, getClients } from "../controllers/client.controller.js";

const router = express.Router();
const protect = require("../middleware/authMiddleware.js");
const{
    createClientValidation,
    validateRequest
}
    = require("../middleware/validationMiddleware.js");
router.post("/clients", createClient);
router.get("/clients", getClients);

module.exports = router;
