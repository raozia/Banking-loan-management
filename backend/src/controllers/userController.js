const jwt = require("jsonwebtoken");
const { success, error } = require("../constants/messages");
const userService = require("../services/userServices");
const response = require("../constants/response");
const jwtutils = require("../utils/token");
// ########################### ADD NEW USER ##############################
const createUser = async (req, res) => {
  try {
    const data = req.body;

    const result = await userService.createUser(data);

    return res
      .status(201)
      .json(response.successRes(201, "User created successfully", result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const verifyInvite = async (req, res) => {
  try {
    const token = req.query.token;

    const result = await userService.verifyInvite(token);

    return res
      .status(200)
      .json(response.successRes(200, "User Verified", result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const setPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const result = await userService.setPassword(token, password);

    return res
      .status(200)
      .json(response.successRes(200, "Password Set", result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET ALL USERS ##############################
const allUsers = async (req, res) => {
  try {
    const result = await userService.allUsers();

    return res.status(200).json(response.successRes(200, "Users List", result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

// ########################### GET SINGLE USER ##############################
const singleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userService.singleUser(id);

    return res
      .status(200)
      .json(response.successRes(200, "Single User", result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### UPDATE SINGLE USER ##############################
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await userService.updateUser(id, data);

    return res
      .status(200)
      .json(response.successRes(200, "Update User", result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### DELETE SINGLE USER ##############################
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userService.deleteUser(id);

    return res
      .status(200)
      .json(response.successRes(200, "User Deleted", result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

module.exports = {
  createUser,
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
  verifyInvite,
  setPassword,
};
