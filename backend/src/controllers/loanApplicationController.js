const { success, error } = require("../constants/messages");
const loanAppllicationService = require("../services/loanApplicationServices");
const response = require("../constants/response");
// ########################### CREATE NEW APPLICATION ##############################
const createApplication = async (req, res) => {
  try {
    const data = req.body;

    const result = await loanAppllicationService.createApplication(data);

    return res
      .status(201)
      .json(response.successRes(201, success.APPLICATION_ADDED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### LIST OF APPLICATION ##############################
const ApplicationList = async (req, res) => {
  try {
    const result = await loanAppllicationService.getAllApplications();

    return res
      .status(200)
      .json(response.successRes(200, success.APPLICATION_LIST, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET SINGLE APPLICATION ##############################
const singleApplication = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await loanAppllicationService.singleApplication(id);

    return res
      .status(200)
      .json(response.successRes(200, success.SINGLE_APPLICATION, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### UPDATE SINGLE APPLICATION ##############################
const updateApplication = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await loanAppllicationService.updateApplication(id, data);

    return res
      .status(200)
      .json(response.successRes(200, success.APPLICATION_UPDATED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### REJECT APPLICATION ##############################
const rejectApplication = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await loanAppllicationService.rejectApplication(id);

    return res
      .status(200)
      .json(response.successRes(200, success.APPLICATION_DELETED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
module.exports = {
  createApplication,
  ApplicationList,
  singleApplication,
  updateApplication,
  rejectApplication,
};
