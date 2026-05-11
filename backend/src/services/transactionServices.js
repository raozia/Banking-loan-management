const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
// ########################### CREATE NEW TRANSACTION ##############################
const createTransaction = async (data) => {
  const {
    loanID,
    installmentID,
    paymentID,
    trxType,
    trxMethod,
    externalTrxID,
    trxDate,
    amount,
  } = data;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const loanUUID = uuidTextToBin(loanID);
    const installmentUUID = uuidTextToBin(installmentID);
    const paymentUUID = uuidTextToBin(paymentID);
    const [existingLoanID] = await conn.execute(
      `SELECT loanID FROM ${TABLE_NAMES.LOANS} WHERE loanID = ? AND status = 1 `,
      [loanUUID],
    );
    if (existingLoanID.length === 0) {
      throw new Error(error.LOANID_NOTEXIST);
    }

    const [existingInstallmentID] = await conn.execute(
      `SELECT installmentID FROM ${TABLE_NAMES.LOAN_INSTALLMENT} WHERE installmentID = ? AND status = 1`,
      [installmentUUID],
    );
    if (existingInstallmentID.length === 0) {
      throw new Error(error.INSTALLMENTID_NOTEXIST);
    }

    const [existingPaymentID] = await conn.execute(
      `SELECT paymentID FROM ${TABLE_NAMES.LOAN_PAYMENT} WHERE paymentID = ? AND status = 1`,
      [paymentUUID],
    );
    if (existingPaymentID.length === 0) {
      throw new Error(error.PAYMENTID_NOTEXIST);
    }
    const trxUUID = generateUUID();
    await conn.execute(
      `INSERT INTO ${TABLE_NAMES.TRANSACTIONS} (trxID,loanID,installmentID ,paymentID ,trxType,trxMethod,externalTrxID,trxDate,amount) 
      VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        trxUUID.uuid_bin,
        loanUUID,
        installmentUUID,
        paymentUUID,
        trxType,
        trxMethod,
        externalTrxID || null,
        trxDate,
        amount,
      ],
    );
    await conn.commit();
    return {
      trxID: trxUUID.uuid_text,
      loanID,
      installmentID,
      paymentID,
      trxType,
      trxMethod,
      externalTrxID,
      trxDate,
      amount,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};
// ########################### GET LIST OF TRANSACTIONS ##############################
const getTransactionList = async () => {
  const [result] = await db.execute(`SELECT
       BIN_TO_UUID(trxID) AS trxID,
       BIN_TO_UUID(loanID) AS loanID,
       BIN_TO_UUID(installmentID) AS installmentID,
       BIN_TO_UUID(paymentID) AS paymentID,
       trxType,trxMethod,externalTrxID,trxDate,amount
     FROM ${TABLE_NAMES.TRANSACTIONS} 
     WHERE status = 1`);

  return result;
};
// ########################### GET SINGLE TRANSACTION ##############################
const singleTransaction = async (id) => {
  const transactionUUID = uuidTextToBin(id);
  const [existingtransactionUUID] = await db.execute(
    `SELECT trxID FROM ${TABLE_NAMES.TRANSACTIONS} WHERE trxID = ? AND status = 1`,
    [transactionUUID],
  );
  if (existingtransactionUUID.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `SELECT
       BIN_TO_UUID(trxID) AS trxID,
       BIN_TO_UUID(loanID) AS loanID,
       BIN_TO_UUID(installmentID) AS installmentID,
       BIN_TO_UUID(paymentID) AS paymentID,
       trxType,trxMethod,externalTrxID,trxDate,amount
     FROM ${TABLE_NAMES.TRANSACTIONS} 
     WHERE trxID = ? AND status = 1`,
    [transactionUUID],
  );

  return result;
};
// ########################### SOFT DELETE TRANSACTION ##############################
const deleteTransaction = async (id) => {
  const transactionUUID = uuidTextToBin(id);
  const [existingtransactionUUID] = await db.execute(
    `SELECT trxID FROM ${TABLE_NAMES.TRANSACTIONS} WHERE trxID = ? AND status = 1`,
    [transactionUUID],
  );
  if (existingtransactionUUID.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.TRANSACTIONS} SET status = 0 WHERE trxID = ? AND status = 1`,
    [transactionUUID],
  );

  return result;
};
module.exports = {
  createTransaction,
  getTransactionList,
  singleTransaction,
  deleteTransaction,
};
