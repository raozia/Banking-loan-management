const { success, error } = require("../constants/messages");
const response = require("../constants/response");
const bankServices = require("../services/bankServices");
// ########################### ADD BANKS ##############################
const addBank = async (req, res) => {
  try {
    const data = req.body;
    const result = await bankServices.addBank(data);
    return res
      .status(200)
      .json(response.successRes(200, success.BANK_ADDED, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
// ########################### GET BANKS LIST ##############################
const getAllBanks = async (req, res) => {
  try {
    const result = await bankServices.getAllBanks();
    return res
      .status(200)
      .json(response.successRes(200, success.All_BANKS, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
// ########################### GET SINGLE BANK  ##############################
const getSingleBank = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await bankServices.getSingleBank(id);
    return res
      .status(200)
      .json(response.successRes(200, success.SINGLE_BANK, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
// ########################### UPDATE BANKS  ##############################
const updateBank = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await bankServices.updateBank(
      id,
      req.body.bankName,
      req.body.licenseNo,
    );
    return res
      .status(200)
      .json(response.successRes(200, success.BANK_UPDATED, result));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};
// ########################### SOFT DELETE BANK ##############################
const softDeleteBank = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await bankServices.softDeleteBank(id);
    return res.status(200).json(response.successRes(200, success.BANK_DELETED));
  } catch (err) {
    res.status(401).json(response.errorRes(401, err.message));
  }
};

module.exports = {
  addBank,
  getAllBanks,
  getSingleBank,
  updateBank,
  softDeleteBank,
};
