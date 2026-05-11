const { success, error } = require("../constants/messages");
const ledgerService = require("../services/ledgerServices");
const response = require("../constants/response");
// ########################### ADD NEW LEDGER ##############################
const addLedger = async (req, res) => {
  try {
    const data = req.body;

    const result = await ledgerService.addLedger(data);

    return res
      .status(201)
      .json(response.successRes(201, success.LEDGER_ADDED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET LEDGER LIST ##############################
const getLedgerList = async (req, res) => {
  try {
    const result = await ledgerService.getLedgerList();

    return res
      .status(200)
      .json(response.successRes(200, success.LEDGER_LIST, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET SINGLE LEDGER ##############################
const singleLedger = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ledgerService.singleLedger(id);

    return res
      .status(200)
      .json(response.successRes(200, success.SINGLE_LEDGER, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### UPDATE LEDGER ##############################
const updateLedger = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await ledgerService.updateLedger(id, data);

    return res
      .status(200)
      .json(response.successRes(200, success.LEDGER_UPDATED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### DELETE LEDGER ##############################
const deleteLedger = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ledgerService.deleteLedger(id);

    return res
      .status(200)
      .json(response.successRes(200, success.LEDGER_DELETED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
module.exports = {
  addLedger,
  getLedgerList,
  singleLedger,
  updateLedger,
  deleteLedger,
};
