const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
// ########################### CREATE NEW PAYMENT ##############################

const createPayment = async (data) => {
  const { loanID, installmentID, paymentAmount, paidAmount, paymentMethod } =
    data;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const loanUUID = uuidTextToBin(loanID);
    const installmentUUID = uuidTextToBin(installmentID);

    const [existingLoan] = await conn.execute(
      `SELECT loanID FROM ${TABLE_NAMES.LOANS} WHERE loanID = ? AND status = 1`,
      [loanUUID],
    );
    if (existingLoan.length === 0) {
      throw new Error(error.LOANID_NOTEXIST);
    }

    const [existingInstallmentID] = await conn.execute(
      `SELECT installmentID FROM ${TABLE_NAMES.LOAN_INSTALLMENT} WHERE installmentID = ? AND status = 1`,
      [installmentUUID],
    );
    if (existingInstallmentID.length === 0) {
      throw new Error(error.INSTALLMENTID_NOTEXIST);
    }
    const paymentUUID = generateUUID();
    const [result] = await db.execute(
      `INSERT INTO ${TABLE_NAMES.LOAN_PAYMENT}(paymentID,loanID,installmentID,paymentAmount,paidAmount,paymentMethod) VALUES (?,?,?,?,?,?)`,
      [
        paymentUUID.uuid_bin,
        loanUUID,
        installmentUUID,
        paymentAmount,
        paidAmount,
        paymentMethod,
      ],
    );

    await conn.commit();
    return {
      paymentID: paymentUUID.uuid_text,
      loanID,
      instID: installmentID,
      paymentAmount,
      paidAmount,
      paymentMethod,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};
// ########################### GET ALL PAYMENTS ##############################
const getAllLoanPayment = async () => {
  const [result] =
    await db.execute(`SELECT BIN_TO_UUID(paymentID) as paymentID,BIN_TO_UUID(loanID) as loanID,BIN_TO_UUID(installmentID) as installmentID,
       paymentAmount,paidAmount,paymentMethod
     FROM ${TABLE_NAMES.LOAN_PAYMENT} WHERE status = 1`);
  return result;
};
// ########################### GET SINGLE PAYMENT ##############################
const getSinglePayment = async (id) => {
  const paymentUUID = uuidTextToBin(id);
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(paymentID) as paymentID,BIN_TO_UUID(loanID) as loanID,BIN_TO_UUID(installmentID) as installmentID,
       paymentAmount,paidAmount,paymentMethod
     FROM ${TABLE_NAMES.LOAN_PAYMENT} WHERE paymentID = ? AND status = 1 `,
    [paymentUUID],
  );

  return result;
};
// ########################### UPDATE PAYMENTS ##############################
const updatePayment = async (id, data) => {
  const paymentUUID = uuidTextToBin(id);
  const { paymentAmount, paidAmount, paymentMethod } = data;
  const [existingPayment] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOAN_PAYMENT} WHERE paymentID = ? AND status = 1`,
    [paymentUUID],
  );
  if (existingPayment.length === 0) {
    throw new Error(error.PAYMENTID_NOTEXIST);
  }

  await db.execute(
    `UPDATE ${TABLE_NAMES.LOAN_PAYMENT} SET paymentAmount = ? , paidAmount = ?, paymentMethod = ? 
    WHERE paymentID = ? AND status = 1`,
    [paymentAmount, paidAmount, paymentMethod, paymentUUID],
  );
};
// ########################### DELETE PAYMENTS ##############################
const deletePayment = async (id) => {
  const paymentUUID = uuidTextToBin(id);
  const [existingPayment] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOAN_PAYMENT} WHERE paymentID = ? AND status = 1`,
    [paymentUUID],
  );
  if (existingPayment.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }

  await db.execute(
    `UPDATE ${TABLE_NAMES.LOAN_PAYMENT} SET status = 0 
    WHERE paymentID = ? AND status = 1`,
    [paymentUUID],
  );
};
module.exports = {
  createPayment,
  getAllLoanPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
