const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const {
  signup,
  login,
  refreshToken,
  me,
} = require("../controllers/authController");

// /**
//  * @swagger
//  * /auth/signup:
//  *   post:
//  *     summary: Register a new user
//  *     description: Creates a new user account in the system
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userName
//  *               - userEmail
//  *               - password
//  *               - confirm_password
//  *             properties:
//  *               userName:
//  *                 type: string
//  *                 example: Amir Khan
//  *               userEmail:
//  *                 type: string
//  *                 example: amir@gmail.com
//  *               password:
//  *                 type: string
//  *                 example: Password#123
//  *               confirm_password:
//  *                 type: string
//  *                 example: Password#123
//  *     responses:
//  *       201:
//  *         description: User registered successfully
//  *       400:
//  *         description: Email already exists or password validation failed
//  */
// router.post("/signup", signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates user and returns access and refresh tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userEmail
 *               - password
 *             properties:
 *               userEmail:
 *                 type: string
 *                 example: name@gmail.com
 *               password:
 *                 type: string
 *                 example: Password#123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);
router.get("/me", verifyToken, me);

/**
 * @swagger
 * /auth/refreshToken:
 *   post:
 *     summary: Generate new access token using refresh token
 *     description: Uses a valid refresh token to generate a new access token without requiring the user to log in again.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refresh_token
 *             properties:
 *               refresh_token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Refresh token missing
 *       400:
 *         description: Invalid refresh token
 */
router.post("/refreshToken", refreshToken);
module.exports = router;
