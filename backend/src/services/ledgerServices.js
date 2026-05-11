const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
// ########################### ADD NEW LEDGER  ##############################
const addLedger = async (data) => {
  const {
    trxID,
    loanID,
    installmentID,
    paymentID,
    paymentAmount,
    paidAmount,
    remainingAmount,
    metaData,
  } = data;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const trxUUID = uuidTextToBin(trxID);
    const loanUUID = uuidTextToBin(loanID);
    const installmentUUID = uuidTextToBin(installmentID);
    const paymentUUID = uuidTextToBin(paymentID);

    const [existingTrxID] = await conn.execute(
      `SELECT trxID FROM ${TABLE_NAMES.TRANSACTIONS} WHERE trxID = ? AND status = 1 `,
      [trxUUID],
    );
    if (existingTrxID.length === 0) {
      throw new Error(error.TRXID_NOTEXIST);
    }
    const [existingLoanID] = await conn.execute(
      `SELECT loanID FROM ${TABLE_NAMES.LOANS} WHERE loanID = ? AND status =1 `,
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
    const ledgerUUID = generateUUID();
    await conn.execute(
      `INSERT INTO ${TABLE_NAMES.LEDGER} (ledgerID,trxID,loanID,installmentID,paymentID,paymentAmount,paidAmount,remainingAmount,metaData)
      VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        ledgerUUID.uuid_bin,
        trxUUID,
        loanUUID,
        installmentUUID,
        paymentUUID,
        paymentAmount,
        paidAmount,
        remainingAmount || null,
        metaData ? JSON.stringify(metaData) : null,
      ],
    );

    await conn.commit();
    return {
      ledgerID: ledgerUUID.uuid_text,
      trxID,
      loanID,
      installmentID,
      paymentID,
      paymentAmount,
      paidAmount,
      remainingAmount,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};
// ########################### GET LIST OF LEDGERS ##############################
const getLedgerList = async () => {
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(ledgerID) as ledgerID,BIN_TO_UUID(trxID) as trxID,BIN_TO_UUID(loanID) as loanID,BIN_TO_UUID(installmentID) as installmentID,BIN_TO_UUID(paymentID) as paymentID,
    paymentAmount,paidAmount,remainingAmount,metaData FROM ${TABLE_NAMES.LEDGER} WHERE status = 1`,
  );
  return result;
};
// ########################### GET SINGLE LEDGER ##############################
const singleLedger = async (id) => {
  const ledgerUUID = uuidTextToBin(id);
  const [existingLedgerID] = await db.execute(
    `SELECT ledgerID FROM ${TABLE_NAMES.LEDGER} WHERE ledgerID = ? AND status = 1`,
    [ledgerUUID],
  );
  if (existingLedgerID.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }

  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(ledgerID) as ledgerID,BIN_TO_UUID(trxID) as trxID,BIN_TO_UUID(loanID) as loanID,BIN_TO_UUID(installmentID) as installmentID,BIN_TO_UUID(paymentID) as paymentID,
    paymentAmount,paidAmount,remainingAmount,metaData FROM ${TABLE_NAMES.LEDGER} WHERE ledgerID = ? AND status = 1`,
    [ledgerUUID],
  );
  return result;
};
// ########################### UPDATE LEDGER ##############################
const updateLedger = async (id, data) => {
  const ledgerUUID = uuidTextToBin(id);
  const { paymentAmount, paidAmount, remainingAmount, referenceType } = data;
  const [existingLedgerID] = await db.execute(
    `SELECT ledgerID FROM ${TABLE_NAMES.LEDGER} WHERE ledgerID = ? AND status = 1`,
    [ledgerUUID],
  );
  if (existingLedgerID.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.LEDGER} SET paymentAmount = ?, paidAmount = ?, remainingAmount = ?, referenceType = ? WHERE ledgerID = ? AND status = 1`,
    [
      paymentAmount,
      paidAmount,
      remainingAmount,
      referenceType || null,
      ledgerUUID,
    ],
  );
};
// ########################### DELETE LEDGER ##############################
const deleteLedger = async (id) => {
  const ledgerUUID = uuidTextToBin(id);
  const [existingLedgerID] = await db.execute(
    `SELECT ledgerID FROM ${TABLE_NAMES.LEDGER} WHERE ledgerID = ? AND status = 1`,
    [ledgerUUID],
  );
  if (existingLedgerID.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.LEDGER} SET status = 0 WHERE ledgerID = ? AND status = 1`,
    [ledgerUUID],
  );
};
module.exports = {
  addLedger,
  getLedgerList,
  singleLedger,
  updateLedger,
  deleteLedger,
};
