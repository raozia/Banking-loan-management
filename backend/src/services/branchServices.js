const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
// ########################### ADD NEW BRANCH ##############################
const addBranch = async ({ bankID, branchCode, branchName, city, address }) => {
  const [existingcode] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.BRANCHES} WHERE branchCode = ? AND status = 1`,
    [branchCode],
  );
  if (existingcode.length > 0) {
    throw new Error(error.BRANCH_CODE);
  }

  const branchUUID = generateUUID();
  const bankIDBinary = uuidTextToBin(bankID);
  const result = await db.execute(
    `INSERT INTO ${TABLE_NAMES.BRANCHES} (branchID,bankID, branchCode, branchName,city,address) VALUES (?,?,?,?,?,?)`,
    [branchUUID.uuid_bin, bankIDBinary, branchCode, branchName, city, address],
  );

  return {
    id: branchUUID.uuid_text,
    bankID: bankID,
    branchCode: branchCode,
    branchName: branchName,
  };
};

// ########################### GET ALL BRANCHES LIST ##############################
const getAllBranches = async () => {
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(br.branchID) as branchID,BIN_TO_UUID(bn.bankID) as bankID,br.branchCode,br.branchName,br.city,br.address
     FROM ${TABLE_NAMES.BRANCHES} br 
     LEFT JOIN ${TABLE_NAMES.BANKS} bn
     ON br.bankID = bn.bankID
     WHERE br.status = 1`,
  );
  return result;
};

// ########################### GET SINGLE BRANCH ##############################
const getSingleBranch = async (id) => {
  const uuid = uuidTextToBin(id);
  const [result] = await db.execute(
    `SELECT br.branchID_text,bn.bankID_text,br.branchCode,br.branchName,br.city,br.address
     FROM ${TABLE_NAMES.BRANCHES} br 
     LEFT JOIN ${TABLE_NAMES.BANKS} bn
     ON br.bankID = bn.bankID
     WHERE br.branchID = ? AND br.status = 1`,
    [uuid],
  );
  return result;
};

// ########################### UPDATE SINGLE BRANCH ##############################
const updateBranch = async (id, data) => {
  const { branchCode, branchName, city, address } = data;
  const uuid = uuidTextToBin(id);
  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.BRANCHES} 
     SET  branchCode = ?, branchName =?, city =?, address = ?
     WHERE branchID = ? AND status = 1`,
    [branchCode, branchName, city, address, uuid],
  );
  if (result.affectedRows === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  return {
    branchCode: branchCode,
    branchName: branchName,
    city: city,
    address: address,
  };
};
// ########################### UPDATE SINGLE BRANCH ##############################
const softDeleteBranch = async (id) => {
  const uuid = uuidTextToBin(id);
  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.BRANCHES} 
     SET  status = 0
     WHERE branchID = ? AND status = 1`,
    [uuid],
  );
  if (result.affectedRows === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  return result;
};
module.exports = {
  addBranch,
  getAllBranches,
  getSingleBranch,
  updateBranch,
  softDeleteBranch,
};
