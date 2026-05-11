require("dotenv").config();
const db = require("../src/configs/db");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./configs/swagger");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bankRoutes = require("./routes/bankRoutes");
const branchRoutes = require("./routes/branchRoutes");
const rolesRoutes = require("./routes/rolesRoutes");
const usersRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const loanProductRoutes = require("./routes/loanProductRoutes");
const loanApplicationRoutes = require("./routes/loanApplicationRoutes");
const loanRoutes = require("./routes/loanRoutes");
const installmentRoutes = require("./routes/installmentRoutes");
const penaltyRoutes = require("./routes/penaltyRoutes");
const paymentRoutes = require("./routes/loanPaymentRoutes");
const ledgerRoutes = require("./routes/ledgerRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const PORT = process.env.PORT || 3000;

app.use("/banks", bankRoutes);
app.use("/auth", authRoutes);
app.use("/branches", branchRoutes);
app.use("/roles", rolesRoutes);
app.use("/users", usersRoutes);
app.use("/customers", customerRoutes);
app.use("/loanProducts", loanProductRoutes);
app.use("/applications", loanApplicationRoutes);
app.use("/loans", loanRoutes);
app.use("/installments", installmentRoutes);
app.use("/penalties", penaltyRoutes);
app.use("/loanPayments", paymentRoutes);
app.use("/ledgers", ledgerRoutes);
app.use("/transactions", transactionRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
