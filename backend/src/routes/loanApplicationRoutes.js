const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  createApplication,
  ApplicationList,
  singleApplication,
  updateApplication,
  rejectApplication,
} = require("../controllers/loanApplicationController");

/**
 * @swagger
 * /applications/create:
 *   post:
 *     tags: [Loan Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerID
 *               - branchID
 *               - loanProductID
 *               - requestedAmount
 *               - requestedTenure
 *               - applicationDate
 *               - status
 *             properties:
 *               customerID:
 *                 type: string
 *               branchID:
 *                 type: string
 *               loanProductID:
 *                 type: string
 *               requestedAmount:
 *                 type: number
 *               requestedTenure:
 *                 type: integer
 *               applicationDate:
 *                 type: string
 *                 format: date
 *               approvedDate:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *               status:
 *                 type: string
 *                 example: Pending
 *     responses:
 *       201:
 *         description: Application created successfully
 *       400:
 *         description: Validation error or related record not found
 */
router.post(
  "/create",
  protected,
  authorize(["Admin", "Manager"]),
  createApplication,
);
/**
 * @swagger
 * /applications/:
 *   get:
 *     tags: [Loan Applications]
 *     responses:
 *       200:
 *         description: List of loan applications
 *       400:
 *         description: Error fetching applications
 */
router.get("/", protected, authorize(["Admin", "Manager"]), ApplicationList);
/**
 * @swagger
 * /applications/{id}:
 *   get:
 *     tags: [Loan Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Application UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application details
 *       404:
 *         description: Application not found
 */
router.get(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  singleApplication,
);
/**
 * @swagger
 * /applications/{id}:
 *   put:
 *     tags: [Loan Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Application UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestedAmount:
 *                 type: number
 *               requestedTenure:
 *                 type: integer
 *               applicationDate:
 *                 type: string
 *                 format: date
 *               approvedDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Application updated successfully
 *       404:
 *         description: Application not found
 */
router.put(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  updateApplication,
);
/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     tags: [Loan Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Application UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application rejected successfully
 *       404:
 *         description: Application not found
 */
router.delete(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  rejectApplication,
);
module.exports = router;
