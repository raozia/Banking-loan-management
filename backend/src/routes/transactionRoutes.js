const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  createTransaction,
  getTransactionList,
  singleTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
/**
 * @swagger
 * /transactions/add:
 *   post:
 *     summary: Create a new transaction
 *     description: Creates a financial transaction for a loan (e.g. payment, penalty, adjustment).
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - loanID
 *               - trxType
 *               - trxDate
 *               - amount
 *             properties:
 *               loanID:
 *                 type: string
 *                 description: Loan UUID (BIN_TO_UUID value)
 *                 example: "B1C3E1C3-1234-5678-ABCD-123456789ABC"
 *               trxType:
 *                 type: string
 *                 description: Type of transaction
 *                 example: "payment"
 *               trxMethod:
 *                 type: string
 *                 description: Payment/transaction method
 *                 example: "JazzCash"
 *               externalTrxID:
 *                 type: string
 *                 description: Transaction ID from external gateway (if any)
 *                 example: "JC-20260401-987654"
 *               trxDate:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of the transaction
 *                 example: "2026-04-01T10:30:00Z"
 *               amount:
 *                 type: number
 *                 format: double
 *                 description: Transaction amount
 *                 example: 15000.00
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Validation error or invalid loan ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (role not allowed)
 */
router.post(
  "/create",
  protected,
  authorize(["Admin", "Manager"]),
  createTransaction,
);
/**
 * @swagger
 * /transactions/:
 *   get:
 *     summary: Get All transaction
 *     description: All Transaction.
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Transaction not found
 */
router.get("/", protected, authorize(["Admin", "Manager"]), getTransactionList);
/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get single transaction by ID
 *     description: Returns details of a single transaction.
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction UUID (BIN_TO_UUID value)
 *     responses:
 *       200:
 *         description: Transaction details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  singleTransaction,
);
router.delete(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  deleteTransaction,
);
module.exports = router;
