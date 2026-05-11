const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  addBranch,
  getAllBranches,
  getSingleBranch,
  updateBranch,
  softDeleteBranch,
} = require("../controllers/branchController");

/**
 * @swagger
 * /branches/add:
 *   post:
 *     summary: Create branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bankID
 *               - branchCode
 *               - branchName
 *               - city
 *               - address
 *             properties:
 *               bankID:
 *                 type: string
 *               branchCode:
 *                 type: string
 *               branchName:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Branch created successfully
 *       400:
 *         description: Validation error or branch code exists
 */
router.post("/add", protected, authorize(["Admin", "Manager"]), addBranch);
/**
 * @swagger
 * /branches/:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: List of branches
 *       400:
 *         description: Error fetching branches
 */
router.get("/", protected, authorize(["Admin", "Manager"]), getAllBranches);
/**
 * @swagger
 * /branches/{id}:
 *   get:
 *     summary: Get single branch
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Branch UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch details
 *       404:
 *         description: Branch not found
 */
router.get("/:id", protected, authorize(["Admin", "Manager"]), getSingleBranch);
/**
 * @swagger
 * /branches/{id}:
 *   put:
 *     summary: Update branch
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Branch UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               branchCode:
 *                 type: string
 *               branchName:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       404:
 *         description: Branch not found
 */
router.put("/:id", protected, authorize(["Admin", "Manager"]), updateBranch);
/**
 * @swagger
 * /branches/{id}:
 *   delete:
 *     summary: Delete branch
 *     description: Soft deletes a branch.
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Branch UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       404:
 *         description: Branch not found
 */
router.delete(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  softDeleteBranch,
);
module.exports = router;
