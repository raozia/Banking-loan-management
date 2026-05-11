const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  getAllBanks,
  addBank,
  getSingleBank,
  updateBank,
  softDeleteBank,
} = require("../controllers/bankController");
/**
 * @swagger
 * /banks/add:
 *   post:
 *     summary: Create bank
 *     tags: [Banks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bankName
 *               - licenseNo
 *             properties:
 *               bankName:
 *                 type: string
 *               licenseNo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bank created successfully
 *       400:
 *         description: Validation error or license already registered
 */
router.post("/add", protected, authorize(["Admin", "Manager"]), addBank);
/**
 * @swagger
 * /banks/all:
 *   get:
 *     summary: Get all banks
 *     tags: [Banks]
 *     responses:
 *       200:
 *         description: List of banks
 *       400:
 *         description: Error fetching banks
 */
router.get("/all", protected, authorize(["Admin", "Manager"]), getAllBanks);
/**
 * @swagger
 * /banks/{id}:
 *   get:
 *     summary: Get single bank
 *     tags: [Banks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Bank UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bank details
 *       404:
 *         description: Bank not found
 */
router.get("/:id", protected, authorize(["Admin", "Manager"]), getSingleBank);
/**
 * @swagger
 * /banks/{id}:
 *   put:
 *     summary: Update bank
 *     tags: [Banks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Bank UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bankName:
 *                 type: string
 *               licenseNo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bank updated successfully
 *       404:
 *         description: Bank not found
 */
router.put("/:id", protected, authorize(["Admin", "Manager"]), updateBank);
/**
 * @swagger
 * /banks/{id}:
 *   delete:
 *     summary: Delete bank
 *     description: Soft deletes a bank.
 *     tags: [Banks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Bank UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bank deleted successfully
 *       404:
 *         description: Bank not found
 */
router.delete(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  softDeleteBank,
);
module.exports = router;
