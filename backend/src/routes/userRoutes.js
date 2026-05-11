const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  createUser,
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
  verifyInvite,
  setPassword,
} = require("../controllers/userController");

/**
 * @swagger
 * /users/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               userEmail:
 *                 type: string
 *               branchID:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post(
  "/createUser",
  protected,
  authorize(["Admin", "Manager"]),

  createUser,
);
/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get("/all", protected, authorize(["Admin", "Manager"]), allUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get single user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User UUID
 *         schema:
 *           type: string
 *           example:
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get("/:id", protected, authorize(["Admin", "Manager"]), singleUser);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: Amir Khan
 *               userEmail:
 *                 type: string
 *                 example: amir@gmail.com
 *               branchID:
 *                 type: string
 *                 example: 954A0999-5C06-4B71-ABBA-ADBF7E3D30E2
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: 47342F41-7F1B-43D6-869A-76597B48EB5D
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/:id", protected, authorize(["Admin", "Manager"]), updateUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", protected, authorize(["Admin", "Manager"]), deleteUser);
router.get("/invite/verify", verifyInvite);
router.post("/invite/set-password", setPassword);
module.exports = router;
