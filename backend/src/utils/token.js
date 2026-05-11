const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateAccessToken = (userID) =>
  jwt.sign({ userID }, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });

const generateRefreshToken = (userID) =>
  jwt.sign({ userID }, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
