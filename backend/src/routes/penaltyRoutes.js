const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  createPenalty,
  getAllPenalties,
  penaltiesByInstallment,
  singlePenalty,
  updatePenalty,
  deletePenalty,
} = require("../controllers/penaltiesController");

/**
 * @swagger
 * /penalties/add:
 *   post:
 *     summary: Create penalty
 *     tags: [Penalties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - installmentID
 *               - penaltyDate
 *               - amount
 *             properties:
 *               installmentID:
 *                 type: string
 *               penaltyDate:
 *                 type: string
 *                 format: date
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Penalty created successfully
 *       400:
 *         description: Validation error or installment not found
 */
router.post("/add", protected, authorize(["Admin", "Manager"]), createPenalty);
/**
 * @swagger
 * /penalties/all:
 *   get:
 *     summary: Get all penalties
 *     description: Returns all active penalties.
 *     tags: [Penalties]
 *     responses:
 *       200:
 *         description: List of penalties
 *       400:
 *         description: Error fetching penalties
 */
router.get("/all", protected, authorize(["Admin", "Manager"]), getAllPenalties);
/**
 * @swagger
 * /penalties/installment/{id}:
 *   get:
 *     summary: Get penalties by installment
 *     tags: [Penalties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Installment UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of penalties for an installment
 *       404:
 *         description: Installment not found
 */
router.get(
  "/installment/:id",
  protected,
  authorize(["Admin", "Manager"]),
  penaltiesByInstallment,
);
/**
 * @swagger
 * /penalties/{id}:
 *   get:
 *     summary: Get single penalty
 *     tags: [Penalties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Penalty UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Penalty details
 *       404:
 *         description: Penalty not found
 */
router.get("/:id", protected, authorize(["Admin", "Manager"]), singlePenalty);
/**
 * @swagger
 * /penalties/{id}:
 *   put:
 *     summary: Update penalty
 *     tags: [Penalties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Penalty UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               penaltyDate:
 *                 type: string
 *                 format: date
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Penalty updated successfully
 *       404:
 *         description: Penalty not found
 */
router.put("/:id", protected, authorize(["Admin", "Manager"]), updatePenalty);
/**
 * @swagger
 * /penalties/{id}:
 *   delete:
 *     summary: Delete penalty
 *     description: Soft deletes a penalty.
 *     tags: [Penalties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Penalty UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Penalty deleted successfully
 *       404:
 *         description: Penalty not found
 */
router.delete(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  deletePenalty,
);

module.exports = router;
