const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  addProduct,
  allProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/loanProductController");

/**
 * @swagger
 * /loanProducts/add:
 *   post:
 *     summary: Create loan product
 *     tags: [Loan Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - interestRate
 *               - maxAmount
 *               - tenureLimit
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               interestRate:
 *                 type: number
 *               maxAmount:
 *                 type: number
 *               tenureLimit:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Loan product created successfully
 *       400:
 *         description: Validation error
 */
router.post("/add", protected, authorize(["Admin", "Manager"]), addProduct);
/**
 * @swagger
 * /loanProducts/:
 *   get:
 *     summary: Get all loan products
 *     tags: [Loan Products]
 *     responses:
 *       200:
 *         description: List of loan products
 *       400:
 *         description: Error fetching products
 */
router.get("/", protected, authorize(["Admin", "Manager"]), allProducts);
/**
 * @swagger
 * /loanProducts/{id}:
 *   get:
 *     summary: Get single loan product
 *     tags: [Loan Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Loan product UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loan product details
 *       404:
 *         description: Product not found
 */
router.get("/:id", protected, authorize(["Admin", "Manager"]), singleProduct);
/**
 * @swagger
 * /loanProducts/{id}:
 *   put:
 *     summary: Update loan product
 *     tags: [Loan Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Loan product UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               interestRate:
 *                 type: number
 *               maxAmount:
 *                 type: number
 *               tenureLimit:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Loan product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/:id", protected, authorize(["Admin", "Manager"]), updateProduct);
/**
 * @swagger
 * /loanProducts/{id}:
 *   delete:
 *     summary: Delete loan product
 *     tags: [Loan Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Loan product UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loan product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  deleteProduct,
);
module.exports = router;
