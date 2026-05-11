const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const {
  createRole,
  getAllRoles,
  RoleByID,
  updateRole,
  softDeleteRole,
} = require("../controllers/rolesController");

/**
 * @swagger
 * /roles/:
 *   post:
 *     summary: Create new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleName
 *             properties:
 *               roleName:
 *                 type: string
 *                 example: Admin
 *     responses:
 *       200:
 *         description: Role created successfully
 *       400:
 *         description: Role already exists or validation error
 */
router.post("/", protected, authorize(["Admin", "Manager"]), createRole);
/**
 * @swagger
 * /roles/all:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 *       400:
 *         description: Error fetching roles
 */
router.get("/all", protected, authorize(["Admin", "Manager"]), getAllRoles);
/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role details
 *       404:
 *         description: Role not found
 */
router.get("/:id", protected, authorize(["Admin", "Manager"]), RoleByID);
/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role UUID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *                 example: Manager
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 */
router.put("/:id", protected, authorize(["Admin", "Manager"]), updateRole);
/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete role
 *     description: Soft deletes a role.
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role UUID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 */
router.delete(
  "/:id",
  protected,
  authorize(["Admin", "Manager"]),
  softDeleteRole,
);
module.exports = router;
