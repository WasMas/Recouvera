const express = require("express");
const setupSwagger = require("./config/swagger");
const invoiceRoutes = require("./routes/invoice.routes");
const paymentRoutes = require("./routes/payment.routes");

const app = express();

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const clientRoutes = require("./routes/client.routes");

app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);

// Swagger
setupSwagger(app);

app.get("/", (req, res) => {
  res.status(200).json({ message: "HIIII" });
});

module.exports = app;