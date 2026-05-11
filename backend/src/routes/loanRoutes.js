const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  addLoans,
  getAllLoans,
  singleLoan,
  updateLoan,
  loanClosed,
} = require("../controllers/loansController");
/**
 * @swagger
 * /loans/addloan:
 *   post:
 *     summary: Create new loan
 *     description: Creates a new loan for an approved loan application.
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - applicationID
 *               - loanAmount
 *               - tenureLimit
 *               - approvedDate
 *               - disbursedDate
 *               - status
 *             properties:
 *               applicationID:
 *                 type: string
 *                 description: Application UUID
 *               loanAmount:
 *                 type: number
 *               tenureLimit:
 *                 type: integer
 *               approvedDate:
 *                 type: string
 *                 format: date
 *               disbursedDate:
 *                 type: string
 *                 format: date
 *               loan_status:
 *                 type: string
 *                 example: Approved
 *               metaData:
 *                 type: object
 *                 description: Optional extra information stored as JSON
 *     responses:
 *       201:
 *         description: Loan created successfully
 *       400:
 *         description: Validation error or application not found
 */
router.post("/addloan", protected, authorize(["Admin", "Manager"]), addLoans);
/**
 * @swagger
 * /loans/:
 *   get:
 *     summary: Get all loans
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: List of loans
 *       400:
 *         description: Error fetching loans
 */
router.get("/", protected, authorize(["Admin", "Manager"]), getAllLoans);
/**
 * @swagger
 * /loans/{id}:
 *   get:
 *     summary: Get single loan
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Loan UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loan details
 *       404:
 *         description: Loan not found
 */
router.get("/:id", protected, authorize(["Admin", "Manager"]), singleLoan);
/**
 * @swagger
 * /loans/{id}:
 *   put:
 *     summary: Update loan
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Loan UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loanAmount:
 *                 type: number
 *               tenureLimit:
 *                 type: integer
 *               approvedDate:
 *                 type: string
 *                 format: date
 *               disbursedDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *               metaData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Loan updated successfully
 *       404:
 *         description: Loan not found
 */
router.put("/:id", protected, authorize(["Admin", "Manager"]), updateLoan);
/**
 * @swagger
 * /loans/{id}:
 *   delete:
 *     summary: Delete loan
 *     description: Delete Loan.
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Loan UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loan closed successfully
 *       404:
 *         description: Loan not found
 */
router.delete("/:id", protected, authorize(["Admin", "Manager"]), loanClosed);
module.exports = router;
