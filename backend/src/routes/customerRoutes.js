const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  createCustomer,
  customersList,
  singleCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");
/**
 * @swagger
 * /customers/create:
 *   post:
 *     summary: Create customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - branchID
 *               - firstName
 *               - lastName
 *               - email
 *               - nationalID
 *               - address
 *               - phones
 *             properties:
 *               branchID:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               nationalID:
 *                 type: string
 *               address:
 *                 type: string
 *               phones:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Validation error or email already exists
 */
router.post(
  "/create",
  protected,
  authorize(["Admin", "Manager"]),
  createCustomer,
);
/**
 * @swagger
 * /customers/all:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of customers
 *       400:
 *         description: Error fetching customers
 */
router.get("/all", protected, authorize(["Admin", "Manager"]), customersList);
/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get single customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details
 *       404:
 *         description: Customer not found
 */
router.get("/:id", protected, authorize(["Admin", "Manager"]), singleCustomer);
/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               nationalID:
 *                 type: string
 *               address:
 *                 type: string
 *               phones:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 */
router.put("/:id", protected, authorize(["Admin", "Manager"]), updateCustomer);
/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */
router.delete(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  deleteCustomer,
);
module.exports = router;
