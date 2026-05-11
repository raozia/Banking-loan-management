const { success, error } = require("../constants/messages");
const response = require("../constants/response");
const rolesServices = require("../services/rolesServices");

const createRole = async (req, res) => {
  try {
    const data = req.body;
    const result = await rolesServices.createRole(data);
    return res
      .status(200)
      .json(response.successRes(200, success.ROLE_ADDED, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};

const getAllRoles = async (req, res) => {
  try {
    const result = await rolesServices.getAllRoles();
    return res
      .status(200)
      .json(response.successRes(200, success.ROLE_LIST, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};

const RoleByID = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await rolesServices.RoleByID(id);
    return res
      .status(200)
      .json(response.successRes(200, success.SINGLE_ROLE, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};

const updateRole = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await rolesServices.updateRole(id, data);
    return res
      .status(200)
      .json(response.successRes(200, success.ROLE_DELETED, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};

const softDeleteRole = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await rolesServices.softDeleteRole(id);
    return res.status(200).json(response.successRes(200, "Role Updated"));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
module.exports = {
  createRole,
  getAllRoles,
  RoleByID,
  updateRole,
  softDeleteRole,
};
