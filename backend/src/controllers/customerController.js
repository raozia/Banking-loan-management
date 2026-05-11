const { success, error } = require("../constants/messages");
const customerService = require("../services/customerServices");
const response = require("../constants/response");
// ########################### ADD NEW CUSTOMER ##############################
const createCustomer = async (req, res) => {
  try {
    const data = req.body;

    const result = await customerService.createCustomer(data);

    return res
      .status(201)
      .json(response.successRes(201, success.CUSTOMER_ADDED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET CUSTOMERS LIST ##############################
const customersList = async (req, res) => {
  try {
    const result = await customerService.customersList();

    return res
      .status(200)
      .json(response.successRes(200, success.CUSTOMER_LIST, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET SINGLE CUSTOMER ##############################
const singleCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await customerService.singleCustomer(id);

    return res
      .status(200)
      .json(response.successRes(200, success.SINGLE_CUSTOMER, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### UPDATE SINGLE CUSTOMER ##############################
const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await customerService.updateCustomer(id, data);

    return res
      .status(200)
      .json(response.successRes(200, success.CUSTOMER_UPDATED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### DELETE SINGLE CUSTOMER ##############################
const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await customerService.deleteCustomer(id);

    return res
      .status(200)
      .json(response.successRes(200, success.CUSTOMER_DELETED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
module.exports = {
  createCustomer,
  customersList,
  singleCustomer,
  updateCustomer,
  deleteCustomer,
};
