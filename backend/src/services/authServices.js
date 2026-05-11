const bcrypt = require("bcryptjs");
const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const jwtutils = require("../utils/token");
const { generateUUID } = require("../utils/uuid");
const signup = async ({ userName, userEmail, password, confirm_password }) => {
  // ########################### Check Existing Email ##############################
  const [existingUser] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.USERS} WHERE userEmail=? AND status = 1`,
    [userEmail],
  );
  if (existingUser.length > 0) {
    throw new Error(error.EMAIL_EXIST);
  }
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(error.PASSWORD_MUST);
  }

  if (password !== confirm_password) {
    throw new Error(error.PASSWORD_MISMATCH);
  }

  const userUUID = generateUUID();
  // ########################### Convert passwerd into hashed password ##############################
  const hashedPassword = await bcrypt.hash(password, 10);

  // ########################### Insert data into tbl_users table ##############################
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.USERS}  (userID,userName, userEmail, password_hash) VALUES (?,?,?,?)`,
    [userUUID.uuid_bin, userName, userEmail, hashedPassword],
  );
  return {
    message: success.USER_REGISTER,
    user: {
      id: userUUID.uuid_text,
      name: userName,
      email: userEmail,
    },
  };
};

// ########################### Login Api Service ##############################
const login = async ({ userEmail, password }) => {
  const [user] = await db.execute(
    `SELECT BIN_TO_UUID(userID) as userID,
      userEmail,
      password_hash FROM ${TABLE_NAMES.USERS} WHERE userEmail = ? `,
    [userEmail],
  );
  // ########################### Check if email is not registered ##############################
  if (user.length === 0) {
    throw new Error(error.INVALID_CREDENTIALS);
  }

  const rows = user[0];
  const isMatch = await bcrypt.compare(password, rows.password_hash);
  if (!isMatch) {
    throw new Error(error.INVALID_USERNAME);
  }

  // ########################### Assign token on login ##############################

  const accessToken = jwtutils.generateAccessToken(rows.userID);
  const refreshToken = jwtutils.generateRefreshToken(rows.userID);
  return {
    message: success.USER_LOGIN,
    accessToken,
    refreshToken,
  };
};

module.exports = { signup, login };
