const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
// ########################### ADD NEW CUSTOMER ##############################
const createCustomer = async (data) => {
  const { branchID, firstName, lastName, email, nationalID, address, phones } =
    data;

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [existingCustomer] = await conn.execute(
      `SELECT * FROM ${TABLE_NAMES.CUSTOMERS} 
       WHERE email = ? AND status = 1`,
      [email],
    );

    if (existingCustomer.length > 0) {
      throw new Error(error.EMAIL_EXIST);
    }

    const branchUUID = uuidTextToBin(branchID);

    const customerUUID = generateUUID();

    await conn.execute(
      `INSERT INTO ${TABLE_NAMES.CUSTOMERS}
      (customerID, branchID, firstName, lastName, email, nationalID, address)
      VALUES (?,?,?,?,?,?,?)`,
      [
        customerUUID.uuid_bin,
        branchUUID,
        firstName,
        lastName,
        email,
        nationalID,
        address,
      ],
    );

    for (const phone of phones) {
      const phoneUUID = generateUUID();
      await conn.execute(
        `INSERT INTO ${TABLE_NAMES.PHONES}
        (phoneID, customerID, phoneNo)
        VALUES (?,?,?)`,
        [phoneUUID.uuid_bin, customerUUID.uuid_bin, phone],
      );
    }

    await conn.commit();

    return {
      customerID: customerUUID.uuid_text,
      firstName: firstName,
    };
  } catch (err) {
    await conn.rollback();
    throw err;
  }
};
// ########################### GET CUSTOMERS LIST ##############################
const customersList = async () => {
  const [result] = await db.execute(`
    SELECT 
    BIN_TO_UUID(c.customerID) as customerID,
    BIN_TO_UUID(c.branchID) as branchID,
    c.firstName,
    c.lastName,
    c.email,
    c.nationalID,
    c.address,
    JSON_ARRAYAGG(p.phoneNo) AS phones
    FROM ${TABLE_NAMES.CUSTOMERS} c
    LEFT JOIN ${TABLE_NAMES.PHONES} p 
    ON c.customerID = p.customerID
    WHERE c.status = 1 
    GROUP BY c.customerID, c.branchID, c.firstName, c.lastName, 
             c.email, c.nationalID, c.address
  `);
  const obj = result.map((item) => ({
    customers: item.customerID,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    nationalID: item.nationalID,
    address: item.address,
    branchID: item.branchID,
    phone: item.phones,
  }));
  return obj;
};
// ########################### GET SIGNLE CUSTOMER ##############################
const singleCustomer = async (id) => {
  const customerUUID = uuidTextToBin(id);
  const [existingcustomerID] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.CUSTOMERS} WHERE customerID = ? AND status = 1`,
    [customerUUID],
  );
  if (existingcustomerID.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `SELECT 
    BIN_TO_UUID(c.customerID) as customerID,
    BIN_TO_UUID(c.branchID) as branchID,
    c.firstName,
    c.lastName,
    c.email,
    c.nationalID,
    c.address,
    JSON_ARRAYAGG(p.phoneNo) AS phones
    FROM ${TABLE_NAMES.CUSTOMERS} c
    LEFT JOIN ${TABLE_NAMES.PHONES} p 
    ON c.customerID = p.customerID
    WHERE c.customerID = ? AND c.status = 1
    GROUP BY c.customerID, c.branchID, c.firstName, c.lastName, 
             c.email, c.nationalID, c.address`,
    [customerUUID],
  );

  const obj = result.map((item) => ({
    customers: item.customerID,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    nationalID: item.nationalID,
    address: item.address,
    branchID: item.branchID,
    phones: item.phones,
  }));
  return obj;
};
// ########################### UPDATE SINGLE CUSTOMER ##############################
const updateCustomer = async (customerID, data) => {
  const { firstName, lastName, email, nationalID, address, phones } = data;

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const customerUUID = uuidTextToBin(customerID);
    const [existingcustomerID] = await db.execute(
      `SELECT * FROM ${TABLE_NAMES.CUSTOMERS} WHERE customerID = ? AND status = 1`,
      [customerUUID],
    );
    if (existingcustomerID.length === 0) {
      throw new Error(error.RECORD_NOT_FOUND);
    }
    await conn.execute(
      `UPDATE ${TABLE_NAMES.CUSTOMERS}
       SET firstName=?, lastName=?, email=?, nationalID=?, address=?
       WHERE customerID=? AND status=1`,
      [firstName, lastName, email, nationalID, address, customerUUID],
    );

    await conn.execute(`DELETE FROM ${TABLE_NAMES.PHONES} WHERE customerID=?`, [
      customerUUID,
    ]);

    for (const phone of phones) {
      const phoneUUID = generateUUID();

      await conn.execute(
        `INSERT INTO ${TABLE_NAMES.PHONES}
         (phoneID, customerID, phoneNo)
         VALUES (?,?,?)`,
        [phoneUUID.uuid_bin, customerUUID, phone],
      );
    }
    await conn.commit();
    // const [result] = await db.execute(
    //   `SELECT
    // BIN_TO_UUID(c.customerID) as customerID,
    // BIN_TO_UUID(c.branchID) as branchID,
    // c.firstName,
    // c.lastName,
    // c.email,
    // c.nationalID,
    // c.address,
    // p.phoneNo
    // FROM ${TABLE_NAMES.CUSTOMERS} c
    // LEFT JOIN ${TABLE_NAMES.PHONES} p
    // ON c.customerID = p.customerID
    // WHERE c.customerID = ? AND c.status = 1`,
    //   [customerUUID],
    // );
    // return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  }
};
// ########################### DELETE SINGLE CUSTOMER ##############################
const deleteCustomer = async (id) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const customerUUID = uuidTextToBin(id);
    const [existingcustomerID] = await db.execute(
      `SELECT * FROM ${TABLE_NAMES.CUSTOMERS} WHERE customerID = ? AND status = 1`,
      [customerUUID],
    );
    if (existingcustomerID.length === 0) {
      throw new Error(error.RECORD_NOT_FOUND);
    }

    await conn.execute(
      `UPDATE ${TABLE_NAMES.CUSTOMERS} SET status = 0 WHERE customerID=? AND status = 1`,
      [customerUUID],
    );

    await conn.execute(
      `UPDATE ${TABLE_NAMES.PHONES} SET status=0 WHERE customerID =? AND status = 1`,
      [customerUUID],
    );

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};
module.exports = {
  createCustomer,
  customersList,
  singleCustomer,
  updateCustomer,
  deleteCustomer,
};
