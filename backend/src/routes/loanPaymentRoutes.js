const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  createPayment,
  getAllLoanPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
} = require("../controllers/loanPaymentController");
/**
 * @swagger
 * /loanPayments/create:
 *   post:
 *     summary: Create loan payment
 *     tags: [Loan Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - loanID
 *               - installmentID
 *               - paymentAmount
 *               - paidAmount
 *               - paymentMethod
 *             properties:
 *               loanID:
 *                 type: string
 *               installmentID:
 *                 type: string
 *               paymentAmount:
 *                 type: number
 *               paidAmount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Validation error or record not found
 */
router.post(
  "/create",
  protected,
  authorize(["Admin", "Manager"]),
  createPayment,
);
/**
 * @swagger
 * /loanPayments/:
 *   get:
 *     summary: Get all loan payments
 *     tags: [Loan Payments]
 *     responses:
 *       200:
 *         description: List of loan payments
 *       400:
 *         description: Error fetching payments
 */
router.get("/", protected, authorize(["Admin", "Manager"]), getAllLoanPayment);
/**
 * @swagger
 * /loanPayments/{id}:
 *   get:
 *     summary: Get single loan payment
 *     tags: [Loan Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 */
router.get(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  getSinglePayment,
);
/**
 * @swagger
 * /loanPayments/{id}:
 *   put:
 *     summary: Update loan payment
 *     tags: [Loan Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentAmount:
 *                 type: number
 *               paidAmount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 */
router.put("/:id", protected, authorize(["Admin", "Manager"]), updatePayment);
/**
 * @swagger
 * /loanPayments/{id}:
 *   delete:
 *     summary: Delete loan payment
 *     description: Soft deletes a loan payment.
 *     tags: [Loan Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 */
router.delete(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  deletePayment,
);
module.exports = router;
