const { success, error } = require("../constants/messages");
const response = require("../constants/response");
const branchServices = require("../services/branchServices");
// ########################### ADD BRANCHES  ##############################
const addBranch = async (req, res) => {
  try {
    const data = req.body;
    const result = await branchServices.addBranch(data);
    return res
      .status(200)
      .json(response.successRes(200, success.BRANCH_ADDED, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
// ########################### GET BRANCHES LIST ##############################
const getAllBranches = async (req, res) => {
  try {
    const result = await branchServices.getAllBranches();
    return res
      .status(200)
      .json(response.successRes(200, success.BRANCHES_LIST, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
// ########################### GET SINGLE BRANCH ##############################
const getSingleBranch = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await branchServices.getSingleBranch(id);
    return res
      .status(200)
      .json(response.successRes(200, success.SINGLE_BRANCH, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
// ########################### UPDATE SINGLE BRANCH ##############################
const updateBranch = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await branchServices.updateBranch(id, data);
    return res
      .status(200)
      .json(response.successRes(200, success.BRANCH_UPDATED, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};

// ########################### DELETE SINGLE BRANCH ##############################
const softDeleteBranch = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await branchServices.softDeleteBranch(id);
    return res
      .status(200)
      .json(response.successRes(200, success.BRANCH_DELETED));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
module.exports = {
  addBranch,
  getAllBranches,
  getSingleBranch,
  updateBranch,
  softDeleteBranch,
};
