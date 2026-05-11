const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
const sendEmail = require("../configs/sendEMail");
// ########################### CREATE NEW USER ##############################
const createUser = async (data) => {
  const { userName, userEmail, branchID, roles } = data;
  // ########################### Check Existing Email ##############################
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [existingUser] = await conn.execute(
      `SELECT * FROM ${TABLE_NAMES.USERS} WHERE userEmail=? AND status = 1`,
      [userEmail],
    );
    if (existingUser.length > 0) {
      throw new Error(error.EMAIL_EXIST);
    }

    const userUUID = generateUUID();

    await conn.execute(
      `INSERT INTO ${TABLE_NAMES.USERS} (userID, userName, userEmail) VALUES (?,?,?)`,
      [userUUID.uuid_bin, userName, userEmail],
    );

    for (const role of roles) {
      const branchIDBinary = uuidTextToBin(branchID);
      const roleUUID = uuidTextToBin(role);
      const userBranchRoleID = generateUUID();

      await conn.execute(
        `INSERT INTO ${TABLE_NAMES.USER_BRANCH_ROLE} 
         (branchRoleId, branchID, roleID, userID) 
          VALUES (?,?,?,?)`,
        [
          userBranchRoleID.uuid_bin,
          branchIDBinary,
          roleUUID,
          userUUID.uuid_bin,
        ],
      );
    }
    const token = jwt.sign({ userID: userUUID.uuid }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    const inviteUUID = generateUUID();
    await conn.execute(
      `INSERT INTO ${TABLE_NAMES.USER_INVITES}
      (inviteID, userID, token_hash)
      VALUES (?, ?, ?)`,
      [inviteUUID.uuid_bin, userUUID.uuid_bin, token],
    );

    await conn.commit();
    const link = `http://localhost:3000/set-password?token=${token}`;

    await sendEmail(
      userEmail,
      "Set Your Password",
      `You are invited.\nClick to set password:\n${link}\n\nExpires in 24 hours.`,
    );

    return { message: "User invited successfully" };
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};

const verifyInvite = async (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
  const [invite] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.USER_INVITES}
     WHERE token_hash=? `,
    [token],
  );

  if (invite.length === 0) {
    throw new Error("Invalid or expired token");
  }

  return { message: "Token is valid" };
};

const setPassword = async (token, password) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error("Invalid or expired token");
    }

    const [result] = await conn.execute(
      `SELECT * FROM ${TABLE_NAMES.USER_INVITES} WHERE token_hash = ? `,
      [token],
    );
    if (result.length === 0) {
      throw new Error(error.RECORD_NOT_FOUND);
    }
    const userID = result[0].userID;
    const passwordHash = await bcrypt.hash(password, 10);
    await conn.execute(
      `UPDATE ${TABLE_NAMES.USERS} SET password_hash = ? , user_type = 3 WHERE userID = ?`,
      [passwordHash, userID],
    );
    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw new Error(error);
  }
};
// ########################### GET ALL USERS ##############################

const allUsers = async () => {
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(u.userID) as userID, u.userName,u.userEmail,BIN_TO_UUID(br.branchID) branchID,
    b.branchName,b.branchCode,BIN_TO_UUID(br.roleID) roleID ,r.roleName FROM
    ${TABLE_NAMES.USERS} u 
    LEFT JOIN ${TABLE_NAMES.USER_BRANCH_ROLE} br 
    ON br.userID = u.userID
    LEFT JOIN ${TABLE_NAMES.ROLES} r
    ON r.roleID = br.roleID
    LEFT JOIN ${TABLE_NAMES.BRANCHES} b
    ON br.branchID = b.branchID
    WHERE u.status = 1
    `,
  );
  const userMap = {};

  result.forEach((row) => {
    if (!userMap[row.userID]) {
      userMap[row.userID] = {
        userID: row.userID,
        userName: row.userName,
        userEmail: row.userEmail,
        branch: {
          branchID: row.branchID,
          branchName: row.branchName,
          branchCode: row.branchCode,
        },
        roles: [],
      };
    }

    if (row.roleID) {
      userMap[row.userID].roles.push({
        roleID: row.roleID,
        roleName: row.roleName,
      });
    }
  });

  const obj = Object.values(userMap);
  return obj;
};
// ########################### GET SINGLE USER ##############################

const singleUser = async (id) => {
  const uuid = uuidTextToBin(id);
  const [existingID] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.USERS} WHERE userID = ? AND status = 1`,
    [uuid],
  );
  if (existingID.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(u.userID) as userID, u.userName,u.userEmail,BIN_TO_UUID(br.branchID) branchID,
    b.branchName,b.branchCode,BIN_TO_UUID(br.roleID) as roleID,
    r.roleName  FROM
    ${TABLE_NAMES.USERS} u 
    LEFT JOIN ${TABLE_NAMES.USER_BRANCH_ROLE} br 
    ON br.userID = u.userID
    LEFT JOIN ${TABLE_NAMES.ROLES} r
    ON r.roleID = br.roleID
    LEFT JOIN ${TABLE_NAMES.BRANCHES} b
    ON br.branchID = b.branchID
    WHERE u.userID = ? AND u.status = 1
    `,
    [uuid],
  );
  const userMap = {};

  result.forEach((row) => {
    if (!userMap[row.userID]) {
      userMap[row.userID] = {
        userID: row.userID,
        userName: row.userName,
        userEmail: row.userEmail,
        branch: {
          branchID: row.branchID,
          branchName: row.branchName,
          branchCode: row.branchCode,
        },
        roles: [],
      };
    }

    if (row.roleID) {
      userMap[row.userID].roles.push({
        roleID: row.roleID,
        roleName: row.roleName,
      });
    }
  });

  const obj = Object.values(userMap);
  return obj;
};
// ########################### UPDATE SINGLE USER ##############################
const updateUser = async (id, data) => {
  const { userName, userEmail, branchID, roles } = data;
  const uuid = uuidTextToBin(id);
  const branchIDBinary = uuidTextToBin(branchID);

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [existingID] = await conn.execute(
      `SELECT * FROM ${TABLE_NAMES.USERS} WHERE userID = ? AND status = 1`,
      [uuid],
    );
    if (existingID.length === 0) {
      throw new Error(error.RECORD_NOT_FOUND);
    }

    await conn.execute(
      `UPDATE ${TABLE_NAMES.USERS} SET userName = ? , userEmail = ? WHERE userID = ? AND status = 1`,
      [userName, userEmail, uuid],
    );

    await conn.execute(
      `DELETE FROM ${TABLE_NAMES.USER_BRANCH_ROLE}
       WHERE userID = ?`,
      [uuid],
    );
    for (const role of roles) {
      const roleIDBinary = uuidTextToBin(role);
      const branchRoleId = generateUUID();
      await conn.execute(
        `INSERT INTO ${TABLE_NAMES.USER_BRANCH_ROLE}
         (branchRoleId, branchID, roleID, userID)
         VALUES (?,?,?,?)`,
        [branchRoleId, branchIDBinary, roleIDBinary, uuid],
      );
    }

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};
// ########################### DELETE SINGLE USER ##############################
const deleteUser = async (id) => {
  const uuid = uuidTextToBin(id);
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [existingID] = await db.execute(
      `SELECT * FROM ${TABLE_NAMES.USERS} WHERE userID = ? AND status = 1`,
      [uuid],
    );
    if (existingID.length === 0) {
      throw new Error(error.RECORD_NOT_FOUND);
    }
    await db.execute(
      `UPDATE ${TABLE_NAMES.USERS} SET status = 0 WHERE userID = ? AND status = 1`,
      [uuid],
    );

    await db.execute(
      `UPDATE ${TABLE_NAMES.USER_BRANCH_ROLE} SET status = 0 WHERE userID = ? AND status =1`,
      [uuid],
    );

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};
module.exports = {
  createUser,
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
  verifyInvite,
  setPassword,
};
