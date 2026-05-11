const jwt = require("jsonwebtoken");
const { success, error } = require("../constants/messages");
const authService = require("../services/authServices");
const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const response = require("../constants/response");
const jwtutils = require("../utils/token");

// ########################### SignUp api ##############################
const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res
      .status(201)
      .json(response.successRes(201, success.USER_REGISTER, result.user));
  } catch (error) {
    res.status(400).json(response.errorRes(400, error.message));
  }
};

// ########################### Login api ##############################
const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(
      response.successRes(200, result.message, {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      }),
    );
  } catch (error) {
    res.status(401).json(response.errorRes(401, error.message));
  }
};

// ########################### Refresh token generate ##############################
const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      return res
        .status(401)
        .json(response.errorRes(401, error.REFRESH_TOKEN_MISSING));
    }
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_SECRET);
    const newAccessToken = jwtutils.generateAccessToken(decoded.userId);
    console.log(newAccessToken);
    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    return res
      .status(400)
      .json(response.errorRes(400, error.INVALID_REFRESH_TOKEN));
  }
};

const me = async (req, res) => {
  try {
    const userId = req.user.userID;
    const [user] = await db.execute(
      `SELECT BIN_TO_UUID(userID) as userID, userEmail 
       FROM ${TABLE_NAMES.USERS} 
       WHERE userID = UUID_TO_BIN(?) AND status = 1`,
      [userId],
    );
    if (user.length === 0) {
      return res.status(404).json(response.errorRes(404, "User not found"));
    }

    res
      .status(200)
      .json(response.successRes(200, "User fetched successfully", user[0]));
  } catch (err) {
    console.log(err);
    res.status(500).json(response.errorRes(500, "bad request"));
  }
};

module.exports = { signup, login, refreshToken, me };
