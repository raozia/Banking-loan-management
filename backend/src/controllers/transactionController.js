const { success, error } = require("../constants/messages");
const transactionService = require("../services/transactionServices");
const response = require("../constants/response");

const createTransaction = async (req, res) => {
  try {
    const data = req.body;
    const result = await transactionService.createTransaction(data);

    return res
      .status(201)
      .json(response.successRes(201, success.TRANSACTION_ADDED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const getTransactionList = async (req, res) => {
  try {
    const result = await transactionService.getTransactionList();

    return res
      .status(200)
      .json(response.successRes(200, success.TRANSACTIONS_LIST, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const singleTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await transactionService.singleTransaction(id);

    return res
      .status(200)
      .json(response.successRes(200, success.TRANSACTIONS_LIST, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await transactionService.deleteTransaction(id);

    return res
      .status(200)
      .json(response.successRes(200, success.TRANSACTION_DELETED));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

module.exports = {
  createTransaction,
  getTransactionList,
  singleTransaction,
  deleteTransaction,
};
