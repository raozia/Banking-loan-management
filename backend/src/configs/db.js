const mysql = require("mysql2/promise");
// console.log("database conected", process.env.DB_PORT);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
// if (db.getConnection()) {
//   console.log("connection success");
// } else {
//   console.log("connectino failed");
// }
db.getConnection()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));
module.exports = db;
