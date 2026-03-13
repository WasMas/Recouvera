const express = require("express");
const setupSwagger = require("./config/swagger");
const connectDB = require("./config/db");

connectDB();
const app = express();

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const clientRoutes = require("./routes/client.routes");
const invoiceRoutes = require("./routes/invoice.routes");
const paymentRoutes = require("./routes/payment.routes");
const recoveryRoutes = require("./routes/recovery.routes");
const statsRoutes = require("./routes/stats.routes");

app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/recoveries", recoveryRoutes);
app.use("/api/stats", statsRoutes);

// Swagger
setupSwagger(app);

app.get("/", (req, res) => {
  res.status(200).json({ message: "HIIII" });
});


//express app
if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("Server running"));
}

module.exports = app;