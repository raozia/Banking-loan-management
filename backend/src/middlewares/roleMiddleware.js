const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { uuidTextToBin } = require("../utils/uuid");

const authorize = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userUUID = uuidTextToBin(req.user.userID);
      const [roles] = await db.execute(
        `SELECT r.roleName
         FROM ${TABLE_NAMES.USER_BRANCH_ROLE} ubr
         JOIN ${TABLE_NAMES.ROLES} r
         ON ubr.roleID = r.roleID
         WHERE ubr.userID = ? AND ubr.status = 1`,
        [userUUID],
      );

      const userRoles = roles.map((r) => r.roleName);

      const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

      if (!hasAccess) {
        return res.status(403).json({
          message: "Access denied NOTE: Only admin or manager can access",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
};

module.exports = authorize;
