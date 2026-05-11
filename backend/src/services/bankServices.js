const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
// ########################### ADD NEW BANK ##############################
const addBank = async ({ bankName, licenseNo }) => {
  const [existingLicense] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.BANKS} WHERE licenseNo = ? AND status=1`,
    [licenseNo],
  );
  if (existingLicense.length > 0) {
    throw new Error(error.BANK_LICENSE_REGISTERED);
  }
  const bankUUID = generateUUID();
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.BANKS} (bankID,bankName, licenseNo) VALUES (?,?,?)`,
    [bankUUID.uuid_bin, bankName, licenseNo],
  );

  return {
    id: bankUUID.uuid_text,
    name: bankName,
    licenseNo: licenseNo,
  };
};
// ########################### GET BANKS LIST ##############################
const getAllBanks = async () => {
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(bankID) as bankID,bankName,licenseNo FROM ${TABLE_NAMES.BANKS} WHERE status = 1`,
  );
  return result;
};

// ########################### GET BANK BY ID ##############################
const getSingleBank = async (id) => {
  const uuid = uuidTextToBin(id);
  const [existingLicense] = await db.execute(
    `SELECT bankID FROM ${TABLE_NAMES.BANKS} WHERE bankID = ? AND status=1`,
    [uuid],
  );
  if (existingLicense.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(bankID) as bankID,bankName,licenseNo FROM ${TABLE_NAMES.BANKS} WHERE bankID = ? AND status = 1`,
    [uuid],
  );
  return result;
};
// ########################### UPDATE BANKS ##############################
const updateBank = async (id, bankName, licenseNo) => {
  const uuid = uuidTextToBin(id);

  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.BANKS} SET bankName = ? WHERE bankID = ? AND status = 1`,
    [bankName, uuid],
  );
  if (result.affectedRows === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  return {
    bankName: bankName,
  };
};
// ########################### SOFT DELETE BANK ##############################
const softDeleteBank = async (id) => {
  const uuid = uuidTextToBin(id);
  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.BANKS} SET status = 0 WHERE bankID = ? AND status = 1`,
    [uuid],
  );
  if (result.affectedRows === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  return result;
};

module.exports = {
  addBank,
  getAllBanks,
  getSingleBank,
  updateBank,
  softDeleteBank,
};
