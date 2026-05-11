const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  addLedger,
  getLedgerList,
  singleLedger,
  updateLedger,
  deleteLedger,
} = require("../controllers/ledgerController");
/**
 * @swagger
 * /ledgers/add:
 *   post:
 *     summary: Create ledger entry
 *     tags: [Ledgers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - trxID
 *               - loanID
 *               - installmentID
 *               - paymentID
 *               - paymentAmount
 *               - paidAmount
 *             properties:
 *               trxID:
 *                 type: string
 *               loanID:
 *                 type: string
 *               installmentID:
 *                 type: string
 *               paymentID:
 *                 type: string
 *               paymentAmount:
 *                 type: number
 *               paidAmount:
 *                 type: number
 *               remainingAmount:
 *                 type: number
 *                 nullable: true
 *               metaData:
 *                 type: object
 *     responses:
 *       201:
 *         description: Ledger entry created successfully
 *       400:
 *         description: Validation error or related record not found
 */
router.post("/add", protected, authorize(["Admin", "Manager"]), addLedger);
/**
 * @swagger
 * /ledgers/:
 *   get:
 *     summary: Get all ledger entries
 *     tags: [Ledgers]
 *     responses:
 *       200:
 *         description: List of ledger entries
 *       400:
 *         description: Error fetching ledger
 */
router.get("/", protected, authorize(["Admin", "Manager"]), getLedgerList);
/**
 * @swagger
 * /ledgers/{id}:
 *   get:
 *     summary: Get single ledger entry
 *     tags: [Ledgers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ledger UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ledger entry details
 *       404:
 *         description: Ledger entry not found
 */
router.get("/:id", protected, authorize(["Admin", "Manager"]), singleLedger);
/**
 * @swagger
 * /ledgers/{id}:
 *   put:
 *     summary: Update ledger entry
 *     tags: [Ledgers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ledger UUID
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
 *               remainingAmount:
 *                 type: number
 *               referenceType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ledger entry updated successfully
 *       404:
 *         description: Ledger entry not found
 */
router.put("/:id", protected, authorize(["Admin", "Manager"]), updateLedger);
/**
 * @swagger
 * /ledgers/{id}:
 *   delete:
 *     summary: Delete ledger entry
 *     description: Soft deletes a ledger entry.
 *     tags: [Ledgers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ledger UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ledger entry deleted successfully
 *       404:
 *         description: Ledger entry not found
 */
router.delete("/:id", protected, authorize(["Admin", "Manager"]), deleteLedger);
module.exports = router;
