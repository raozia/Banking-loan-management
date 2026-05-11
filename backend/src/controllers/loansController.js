const { success, error } = require("../constants/messages");
const loanService = require("../services/loansServices");
const response = require("../constants/response");
// ########################### ADD NEW LOAN ##############################
const addLoans = async (req, res) => {
  try {
    const data = req.body;
    const result = await loanService.addLoans(data);

    return res
      .status(201)
      .json(response.successRes(201, success.LOAN_ADDED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET LIST OF LOAN ##############################
const getAllLoans = async (req, res) => {
  try {
    const result = await loanService.getAllLoans();
    return res
      .status(200)
      .json(response.successRes(200, success.LOANS_LIST, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET SINGLE LOAN ##############################
const singleLoan = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await loanService.singleLoan(id);
    return res
      .status(200)
      .json(response.successRes(200, success.LOANS_LIST, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### UPDATE LOAN ##############################
const updateLoan = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await loanService.updateLoan(id, data);
    return res
      .status(200)
      .json(response.successRes(200, success.LOAN_UPDATED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### CLOSE SINGLE LOAN ##############################
const loanClosed = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await loanService.loanClosed(id);
    return res
      .status(200)
      .json(response.successRes(200, success.LOAN_DELETED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
module.exports = { addLoans, getAllLoans, singleLoan, updateLoan, loanClosed };
