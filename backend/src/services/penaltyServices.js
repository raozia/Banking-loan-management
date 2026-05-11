const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
// ########################### CREATE PENALTY ##############################
const createPenalty = async (data) => {
  const { installmentID, penaltyDate, amount } = data;

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const instUUID = uuidTextToBin(installmentID);
    const [existingInst] = await conn.execute(
      `SELECT installmentID FROM ${TABLE_NAMES.LOAN_INSTALLMENT}
       WHERE installmentID = ? AND status = 1`,
      [instUUID],
    );
    if (existingInst.length === 0) {
      throw new Error(error.INSTALLMENTID_NOTEXIST);
    }
    const penaltyUUID = generateUUID();

    await conn.execute(
      `INSERT INTO ${TABLE_NAMES.PENALTIES}
       (penaltyID, installmentID, penaltyDate, amount)
       VALUES (?,?,?,?)`,
      [penaltyUUID.uuid_bin, instUUID, penaltyDate, amount],
    );

    await conn.commit();

    return {
      penaltyID: penaltyUUID.uuid_text,
      installmentID,
      penaltyDate,
      amount,
    };
  } catch (err) {
    await conn.rollback();
    throw err;
  }
};
// ########################### GET LIST OF PENALTY BY PENALTY ID ##############################
const getAllPenalties = async () => {
  const [result] = await db.execute(
    `SELECT
       BIN_TO_UUID(penaltyID) as penaltyID,
       BIN_TO_UUID(installmentID) as installmentID,penaltyDate,amount
     FROM ${TABLE_NAMES.PENALTIES} 
     WHERE status = 1`,
  );

  return result;
};
// ########################### LIST OF PENALTIES BY INSTALLMENT ID ##############################
const penaltiesByInstallment = async (id) => {
  const instUUID = uuidTextToBin(id);
  const [existingInstallment] = await db.execute(
    `SELECT installmentID FROM ${TABLE_NAMES.LOAN_INSTALLMENT} WHERE installmentID = ? AND status = 1`,
    [instUUID],
  );
  if (existingInstallment.length === 0) {
    throw new Error(error.INSTALLMENTID_NOTEXIST);
  }
  const [result] = await db.execute(
    `SELECT
       BIN_TO_UUID(penaltyID) as penaltyID,
       BIN_TO_UUID(installmentID) as installmentID,penaltyDate,amount
     FROM ${TABLE_NAMES.PENALTIES} 
     WHERE installmentID = ? AND status = 1`,
    [instUUID],
  );

  return result;
};

// ########################### SINGLE PENALTY ##############################
const singlePenalty = async (id) => {
  const penaltyUUID = uuidTextToBin(id);

  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.PENALTIES}
     WHERE penaltyID = ? AND status = 1`,
    [penaltyUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }

  const [result] = await db.execute(
    `SELECT
       BIN_TO_UUID(p.penaltyID) AS penaltyID,
       BIN_TO_UUID(p.installmentID) AS installmentID,
       p.penaltyDate,
       p.amount
     FROM ${TABLE_NAMES.PENALTIES} p
     WHERE p.penaltyID = ? AND p.status = 1`,
    [penaltyUUID],
  );

  return result;
};

// ########################### UPDATE PENALTY ##############################
const updatePenalty = async (id, data) => {
  const { penaltyDate, amount } = data;
  const penaltyUUID = uuidTextToBin(id);

  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.PENALTIES}
     WHERE penaltyID = ? AND status = 1`,
    [penaltyUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }

  await db.execute(
    `UPDATE ${TABLE_NAMES.PENALTIES}
     SET penaltyDate = ?,amount = ?
     WHERE penaltyID = ? AND status = 1`,
    [penaltyDate, amount, penaltyUUID],
  );
};

// ########################### DELETE SINGLE PENALTY ##############################
const deletePenalty = async (id) => {
  const penaltyUUID = uuidTextToBin(id);

  const [existing] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.PENALTIES}
     WHERE penaltyID = ? AND status = 1`,
    [penaltyUUID],
  );
  if (existing.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }

  await db.execute(
    `UPDATE ${TABLE_NAMES.PENALTIES}
     SET status = 0
     WHERE penaltyID = ? AND status = 1`,
    [penaltyUUID],
  );
};

module.exports = {
  createPenalty,
  getAllPenalties,
  penaltiesByInstallment,
  singlePenalty,
  updatePenalty,
  deletePenalty,
};
