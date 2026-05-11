const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
// ########################### CREATE NEW APPLICATION ##############################
const createApplication = async (data) => {
  const {
    customerID,
    branchID,
    loanProductID,
    requestedAmount,
    requestedTenure,
    applicationDate,
    approvedDate,
    applicationstatus,
  } = data;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const customerUUID = uuidTextToBin(customerID);
    const branchUUID = uuidTextToBin(branchID);
    const loanProductUUID = uuidTextToBin(loanProductID);

    const [existingCustomer] = await conn.execute(
      `SELECT customerID FROM ${TABLE_NAMES.CUSTOMERS}
       WHERE customerID = ? AND status = 1`,
      [customerUUID],
    );
    if (existingCustomer.length === 0) {
      throw new Error(error.CUSTOMERID_NOTEXIST);
    }

    const [existingBranchID] = await conn.execute(
      `SELECT branchID FROM ${TABLE_NAMES.BRANCHES}
       WHERE branchID = ? AND status = 1`,
      [branchUUID],
    );
    if (existingBranchID.length === 0) {
      throw new Error(error.BRANCHID_NOTEXIST);
    }

    const [existingProductID] = await conn.execute(
      `SELECT loanProductID FROM ${TABLE_NAMES.LOAN_PRODUCTS}
       WHERE loanProductID = ? AND status = 1`,
      [loanProductUUID],
    );
    if (existingProductID.length === 0) {
      throw new Error(error.PRODUCDID_NOTEXIST);
    }
    const applicationUUID = generateUUID();
    const [result] = await conn.execute(
      `INSERT INTO ${TABLE_NAMES.LOAN_APPLICATION} (applicationID,customerID,branchID,loanProductID,requestedAmount,requestedTenure,applicationDate,approvedDate,application_status) 
      VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        applicationUUID.uuid_bin,
        customerUUID,
        branchUUID,
        loanProductUUID,
        requestedAmount,
        requestedTenure,
        applicationDate,
        approvedDate,
        applicationstatus,
      ],
    );
    await conn.commit();
    return {
      applicationID: applicationUUID.uuid_text,
      customerID,
      branchID,
      loanProductID,
      requestedAmount,
      requestedTenure,
      applicationDate,
      applicationstatus,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};
// ########################### GET LIST OF APPLICATION ##############################
const getAllApplications = async () => {
  const [result] = await db.execute(
    `SELECT 
       BIN_TO_UUID(a.applicationID) AS applicationID,
       BIN_TO_UUID(a.customerID) AS customerID,
       BIN_TO_UUID(a.branchID) AS branchID,
       BIN_TO_UUID(a.loanProductID) AS loanProductID,
       a.requestedAmount,
       a.requestedTenure,
       a.applicationDate,
       a.approvedDate,
       a.application_status
     FROM ${TABLE_NAMES.LOAN_APPLICATION} a
     WHERE a.status = 1
     `,
  );

  return result;
};
// ########################### GET SINGLE APPLICATION ##############################
const singleApplication = async (id) => {
  const ApplicationUUID = uuidTextToBin(id);
  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOAN_APPLICATION}
     WHERE applicationID = ? AND status = 1`,
    [ApplicationUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `SELECT 
       BIN_TO_UUID(a.applicationID) AS applicationID,
       BIN_TO_UUID(a.customerID) AS customerID,
       BIN_TO_UUID(a.branchID) AS branchID,
       BIN_TO_UUID(a.loanProductID) AS loanProductID,
       a.requestedAmount,
       a.requestedTenure,
       a.applicationDate,
       a.approvedDate,
       a.application_status
     FROM ${TABLE_NAMES.LOAN_APPLICATION} a
     WHERE a.applicationID = ? AND  a.status = 1
     `,
    [ApplicationUUID],
  );

  return result;
};
// ########################### UPDATE SINGLE APPLICATION ##############################
const updateApplication = async (id, data) => {
  const ApplicationUUID = uuidTextToBin(id);
  const {
    requestedAmount,
    requestedTenure,
    applicationDate,
    approvedDate,
    application_status,
  } = data;

  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOAN_APPLICATION}
     WHERE applicationID = ? AND status =1`,
    [ApplicationUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }

  await db.execute(
    `UPDATE ${TABLE_NAMES.LOAN_APPLICATION} SET requestedAmount = ?,requestedTenure = ?,applicationDate = ?,approvedDate = ?, application_status = ? WHERE applicationID = ? AND status = 1`,
    [
      requestedAmount,
      requestedTenure,
      applicationDate,
      approvedDate,
      application_status,
      ApplicationUUID,
    ],
  );
};
// ########################### REJECT APPLICATION ##############################
const rejectApplication = async (id) => {
  const ApplicationUUID = uuidTextToBin(id);
  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOAN_APPLICATION}
     WHERE applicationID = ? AND status = 1`,
    [ApplicationUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }

  await db.execute(
    `UPDATE ${TABLE_NAMES.LOAN_APPLICATION}
     SET status = 0
     WHERE applicationID = ? AND status = 1`,
    [ApplicationUUID],
  );
};
module.exports = {
  createApplication,
  getAllApplications,
  singleApplication,
  updateApplication,
  rejectApplication,
};
