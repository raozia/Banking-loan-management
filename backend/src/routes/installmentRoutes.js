const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  addInstallment,
  getAllInstallments,
  singleInstallment,
  updateInstallment,
  deleteInstallment,
} = require("../controllers/installmentController");
/**
 * @swagger
 * /installments/add:
 *   post:
 *     summary: Create loan installment
 *     tags: [Installments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - loanID
 *               - installmentNo
 *               - dueDate
 *               - dueAmount
 *             properties:
 *               loanID:
 *                 type: string
 *               installmentNo:
 *                 type: integer
 *               dueDate:
 *                 type: string
 *                 format: date
 *               dueAmount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Installment created successfully
 *       400:
 *         description: Validation error
 */
router.post("/add", protected, authorize(["Admin", "Manager"]), addInstallment);
/**
 * @swagger
 * /installments/:
 *   get:
 *     summary: Get all installments
 *     tags: [Installments]
 *     responses:
 *       200:
 *         description: List of installments
 *       400:
 *         description: Error fetching installments
 */
router.get("/", protected, authorize(["Admin", "Manager"]), getAllInstallments);
/**
 * @swagger
 * /installments/{id}:
 *   get:
 *     summary: Get single installment
 *     tags: [Installments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Installment UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Installment details
 *       404:
 *         description: Installment not found
 */
router.get(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  singleInstallment,
);
/**
 * @swagger
 * /installments/{id}:
 *   put:
 *     summary: Update installment
 *     tags: [Installments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Installment UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               installmentNo:
 *                 type: integer
 *               dueDate:
 *                 type: string
 *                 format: date
 *               dueAmount:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Installment updated successfully
 *       404:
 *         description: Installment not found
 */
router.put(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  updateInstallment,
);
/**
 * @swagger
 * /installments/{id}:
 *   delete:
 *     summary: Delete installment
 *     description: Delete Installment.
 *     tags: [Installments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Installment UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Installment Deleted
 *       404:
 *         description: Installment not found
 */
router.delete(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  deleteInstallment,
);
module.exports = router;
