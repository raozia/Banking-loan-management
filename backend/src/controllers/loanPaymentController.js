const { success, error } = require("../constants/messages");
const paymentService = require("../services/loanPaymentServices");
const response = require("../constants/response");
// ########################### CREATE NEW PAYMENTS ##############################
const createPayment = async (req, res) => {
  try {
    const data = req.body;

    const result = await paymentService.createPayment(data);

    return res
      .status(201)
      .json(response.successRes(201, success.PAYMENT_ADDED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET ALL PAYMENTS ##############################
const getAllLoanPayment = async (req, res) => {
  try {
    const result = await paymentService.getAllLoanPayment();
    return res
      .status(200)
      .json(response.successRes(200, success.PAYMENT_LIST, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET SINGLE PAYMENT ##############################
const getSinglePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await paymentService.getSinglePayment(id);
    return res
      .status(200)
      .json(response.successRes(200, success.SINGLE_PAYMENT, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### UPDATE PAYMENTS ##############################
const updatePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await paymentService.updatePayment(id, data);
    return res
      .status(200)
      .json(response.successRes(200, success.PAYMENT_UPDATED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### DELETE PAYMENTS ##############################
const deletePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await paymentService.deletePayment(id);
    return res
      .status(200)
      .json(response.successRes(200, success.PAYMENT_DELETED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
module.exports = {
  createPayment,
  getAllLoanPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
