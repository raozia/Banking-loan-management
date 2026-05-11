const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
// ########################### ADD NEW INSTALLMENT ##############################
const addInstallment = async (data) => {
  const { loanID, installmentNo, dueDate, dueAmount } = data;
  const loanUUID = uuidTextToBin(loanID);
  const installmentUUID = generateUUID();
  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOANS}
     WHERE loanID = ? AND status = 1`,
    [loanUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.LOANID_NOTEXIST);
  }
  await db.execute(
    `INSERT INTO ${TABLE_NAMES.LOAN_INSTALLMENT} (installmentID,loanID,installmentNo, dueDate,dueAmount) VALUES (?,?,?,?,?)`,
    [installmentUUID.uuid_bin, loanUUID, installmentNo, dueDate, dueAmount],
  );

  return {
    InstallmentID: installmentUUID.uuid_text,
    loanID: loanID,
    installmentNo,
    dueDate,
    dueAmount,
  };
};
// ########################### GET LIST OF INSTALLMENTS ##############################
const getAllInstallments = async () => {
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(installmentID) as installmentID,BIN_TO_UUID(loanID) as loanID,installmentNo,dueDate,dueAmount,installment_status
    FROM ${TABLE_NAMES.LOAN_INSTALLMENT} WHERE status =1 `,
  );

  return result;
};
// ########################### GET SINGLE INSTALLMENT ##############################
const singleInstallment = async (id) => {
  const installmentUUID = uuidTextToBin(id);
  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOAN_INSTALLMENT}
     WHERE installmentID = ? AND status = 1`,
    [installmentUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(installmentID) as installmentID,BIN_TO_UUID(loanID) as loanID,installmentNo,dueDate,dueAmount,installment_status
    FROM ${TABLE_NAMES.LOAN_INSTALLMENT} WHERE installmentID = ? AND status = 1`,
    [installmentUUID],
  );

  return result;
};
// ########################### UPDATE SINGLE INSTALLMENT ##############################
const updateInstallment = async (id, data) => {
  const installmentUUID = uuidTextToBin(id);
  const { installmentNo, dueDate, dueAmount, installment_status } = data;
  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOAN_INSTALLMENT}
     WHERE installmentID = ? AND status = 1`,
    [installmentUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }

  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.LOAN_INSTALLMENT} SET installmentNo = ?, dueDate = ?, dueAmount = ?, installment_status = ? 
    WHERE installmentID = ? AND status = 1`,
    [installmentNo, dueDate, dueAmount, installment_status, installmentUUID],
  );
  return result;
};
// ########################### SOFT DELETE SINGLE INSTALLMENT ##############################
const deleteInstallment = async (id) => {
  const installmentUUID = uuidTextToBin(id);
  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOAN_INSTALLMENT}
     WHERE installmentID = ? AND status = 1`,
    [installmentUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  await db.execute(
    `UPDATE ${TABLE_NAMES.LOAN_INSTALLMENT} SET status = 0 
    WHERE installmentID = ? AND status = 1`,
    [installmentUUID],
  );
};
module.exports = {
  addInstallment,
  getAllInstallments,
  singleInstallment,
  updateInstallment,
  deleteInstallment,
};
