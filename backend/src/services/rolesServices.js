const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
// ########################### CREATE NEW ROLE ##############################
const createRole = async ({ roleName }) => {
  const [existingRole] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.ROLES} WHERE roleName = ? AND status=1`,
    [roleName],
  );
  if (existingRole.length > 0) {
    throw new Error(error.ROLE_EXISTS);
  }
  const Roleuuid = generateUUID();
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.ROLES} (roleID,roleName) VALUES (?,?)`,
    [Roleuuid.uuid_bin, roleName],
  );
  return {
    id: Roleuuid.uuid_text,
    roleName: roleName,
  };
};
// ########################### GET LIST OF ROLES ##############################
const getAllRoles = async () => {
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(roleID) as roleID,roleName FROM ${TABLE_NAMES.ROLES} WHERE status =1`,
  );
  return result;
};
// ########################### GET SINGLE ROLE ##############################
const RoleByID = async (id) => {
  const uuid = uuidTextToBin(id);
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(roleID) as roleID,roleName FROM ${TABLE_NAMES.ROLES} WHERE roleID = ? AND status = 1`,
    [uuid],
  );
  return result;
};
// ########################### UPDATE SINGLE ROLE ##############################
const updateRole = async (id, data) => {
  const { roleName } = data;
  const uuid = uuidTextToBin(id);
  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.ROLES} SET roleName = ? WHERE roleID = ? AND status = 1`,
    [roleName, uuid],
  );
  if (result.affectedRows === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  return {
    roleName: roleName,
  };
};
// ########################### SOFT DELETE SINGLE ROLE ##############################
const softDeleteRole = async (id) => {
  const uuid = uuidTextToBin(id);
  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.ROLES} SET status = 0 WHERE roleID = ? AND status = 1`,
    [uuid],
  );
  if (result.affectedRows === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  return result;
};

module.exports = {
  createRole,
  getAllRoles,
  RoleByID,
  updateRole,
  softDeleteRole,
};
