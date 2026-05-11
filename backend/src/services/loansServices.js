const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
// ########################### ADD NEW LOAN ##############################
const addLoans = async (data) => {
  const {
    applicationID,
    loanAmount,
    tenureLimit,
    approvedDate,
    disbursedDate,
    loan_status,
    metaData,
  } = data;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const applicationUUID = uuidTextToBin(applicationID);
    const [existingApplication] = await conn.execute(
      `SELECT applicationID FROM ${TABLE_NAMES.LOAN_APPLICATION}
       WHERE applicationID = ? AND status = 1`,
      [applicationUUID],
    );
    if (existingApplication.length === 0) {
      throw new Error(error.RECORD_NOT_FOUND);
    }

    const loanUUID = generateUUID();
    await conn.execute(
      `INSERT INTO ${TABLE_NAMES.LOANS} (loanID,applicationID,loanAmount,tenureLimit,approvedDate,disbursedDate,loan_status,metaData) 
      VALUES (?,?,?,?,?,?,?,?)`,
      [
        loanUUID.uuid_bin,
        applicationUUID,
        loanAmount,
        tenureLimit,
        approvedDate,
        disbursedDate,
        loan_status,
        metaData ? JSON.stringify(metaData) : null,
      ],
    );
    await conn.commit();
    return {
      loanID: loanUUID.uuid_text,
      loanAmount,
      tenureLimit,
      approvedDate,
      disbursedDate,
      loan_status,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};
// ########################### GET LIST OF LOANS ##############################
const getAllLoans = async () => {
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(loanID) as loanID, BIN_TO_UUID(applicationID) as applicationID,loanAmount,tenureLimit,approvedDate,disbursedDate,loan_status 
    FROM ${TABLE_NAMES.LOANS} WHERE status = 1`,
  );

  const obj = result.map((item) => ({
    loanID: item.loanID,
    applicationID: item.applicationID,
    loanAmount: item.loanAmount,
    TenureLimit: item.tenureLimit,
    approvedDate: item.approvedDate,
    disbursedDate: item.disbursedDate,
    loanStatus: item.loan_status,
  }));

  return obj;
};
// ########################### GET SINGLE LOAN ##############################
const singleLoan = async (id) => {
  const loanUUID = uuidTextToBin(id);
  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOANS}
     WHERE loanID = ? AND status = 1`,
    [loanUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(loanID) as loanID, BIN_TO_UUID(applicationID) as applicationID,loanAmount,tenureLimit,approvedDate,disbursedDate,loan_status 
    FROM ${TABLE_NAMES.LOANS} WHERE loanID = ? AND status = 1`,
    [loanUUID],
  );

  const obj = result.map((item) => ({
    loanID: item.loanID,
    applicationID: item.applicationID,
    loanAmount: item.loanAmount,
    TenureLimit: item.tenureLimit,
    approvedDate: item.approvedDate,
    disbursedDate: item.disbursedDate,
    applicationStatus: item.loan_status,
  }));

  return obj;
};
// ########################### UPDATE SINGLE LOAN ##############################
const updateLoan = async (id, data) => {
  const loanUUID = uuidTextToBin(id);
  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOANS}
     WHERE loanID = ? AND status = 1`,
    [loanUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.LOANID_NOTEXIST);
  }
  const {
    loanAmount,
    tenureLimit,
    approvedDate,
    disbursedDate,
    loan_status,
    metaData,
  } = data;
  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.LOANS} SET loanAmount = ?, tenureLimit = ?, approvedDate = ?, disbursedDate = ?, loan_status = ?, metaData = ? WHERE loanID = ? AND status =1`,
    [
      loanAmount,
      tenureLimit,
      approvedDate,
      disbursedDate,
      loan_status,
      metaData ? JSON.stringify(metaData) : null,
      loanUUID,
    ],
  );
};
// ########################### CLOSE LOAN ##############################
const loanClosed = async (id) => {
  const loanUUID = uuidTextToBin(id);
  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOANS}
     WHERE loanID = ? AND status=1`,
    [loanUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }

  await db.execute(
    `UPDATE ${TABLE_NAMES.LOANS} SET status = 0 WHERE loanID = ? AND status = 1`,
    [loanUUID],
  );
};
module.exports = { addLoans, getAllLoans, singleLoan, updateLoan, loanClosed };
