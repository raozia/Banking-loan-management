const { success, error } = require("../constants/messages");
const installmentService = require("../services/installmentServices");
const response = require("../constants/response");
// ########################### ADD NEW INSTALLMENT ##############################
const addInstallment = async (req, res) => {
  try {
    const data = req.body;
    const result = await installmentService.addInstallment(data);

    return res
      .status(201)
      .json(response.successRes(201, success.INSTALLMENTS_ADDED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET LIST OF ALL INSTALLMENTS ##############################
const getAllInstallments = async (req, res) => {
  try {
    const result = await installmentService.getAllInstallments();

    return res
      .status(200)
      .json(response.successRes(200, success.INSTALLMENTS_LIST, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const singleInstallment = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await installmentService.singleInstallment(id);

    return res
      .status(200)
      .json(response.successRes(200, success.SINGLE_INSTALLMENT, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const updateInstallment = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await installmentService.updateInstallment(id, data);

    return res
      .status(200)
      .json(response.successRes(200, success.INSTALLMENT_UPDATED));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const deleteInstallment = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await installmentService.deleteInstallment(id);

    return res
      .status(200)
      .json(response.successRes(200, success.INSTALLMENT_DELETED));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
module.exports = {
  addInstallment,
  getAllInstallments,
  singleInstallment,
  updateInstallment,
  deleteInstallment,
};
