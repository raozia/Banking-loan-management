const { success } = require("../constants/messages");
const penaltyService = require("../services/penaltyServices");
const response = require("../constants/response");
// ########################### CREATE NEW PENALTY ##############################
const createPenalty = async (req, res) => {
  try {
    const data = req.body;
    const result = await penaltyService.createPenalty(data);

    return res
      .status(201)
      .json(response.successRes(201, success.PENALTY_ADDED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const getAllPenalties = async (req, res) => {
  try {
    const result = await penaltyService.getAllPenalties();

    return res
      .status(200)
      .json(response.successRes(200, success.PENALTIES_LIST, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET PENALTY BY INSTALLMENT ID ##############################
const penaltiesByInstallment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await penaltyService.penaltiesByInstallment(id);

    return res
      .status(200)
      .json(response.successRes(200, success.PENALTIES_LIST, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### GET SINGLE PENALTY ##############################
const singlePenalty = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await penaltyService.singlePenalty(id);

    return res
      .status(200)
      .json(response.successRes(200, success.SINGLE_PENALTY, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### UPDATE SINGLE PENALTY ##############################
const updatePenalty = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await penaltyService.updatePenalty(id, data);

    return res
      .status(200)
      .json(response.successRes(200, success.PENALTY_UPDATED));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
// ########################### DELETE SINGLE PENALTY ##############################
const deletePenalty = async (req, res) => {
  try {
    const { id } = req.params;

    await penaltyService.deletePenalty(id);

    return res
      .status(200)
      .json(response.successRes(200, success.PENALTY_DELETED));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

module.exports = {
  createPenalty,
  getAllPenalties,
  penaltiesByInstallment,
  singlePenalty,
  updatePenalty,
  deletePenalty,
};
