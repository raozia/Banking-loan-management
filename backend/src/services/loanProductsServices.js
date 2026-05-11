const db = require("../configs/db");
const TABLE_NAMES = require("../constants/tableNames");
const { error, success } = require("../constants/messages");
const { generateUUID, uuidTextToBin } = require("../utils/uuid");
// ########################### ADD NEW PRODUCT ##############################
const addProduct = async (data) => {
  const { productName, description, interestRate, maxAmount, tenureLimit } =
    data;
  const loanProductUUID = generateUUID();
  const [result] = await db.execute(
    `INSERT INTO ${TABLE_NAMES.LOAN_PRODUCTS} (loanProductID,productName,description,interestRate, maxAmount,tenureLimit) 
    VALUES (?,?,?,?,?,?)`,
    [
      loanProductUUID.uuid_bin,
      productName,
      description,
      interestRate,
      maxAmount,
      tenureLimit,
    ],
  );

  return {
    ProductID: loanProductUUID.uuid_text,
    ProductName: productName,
  };
};
// ########################### GET LIST OF PRODUCTS ##############################
const allProducts = async () => {
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(loanProductID) as loanProductID, productName,description,interestRate,maxAmount,tenureLimit 
    FROM ${TABLE_NAMES.LOAN_PRODUCTS} WHERE status = 1`,
  );
  return result;
};
// ########################### GET SINGLE PRODUCT ##############################
const singleProduct = async (id) => {
  const ProductUUID = uuidTextToBin(id);
  const [existingproductID] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOAN_PRODUCTS} WHERE loanProductID = ? AND status = 1`,
    [ProductUUID],
  );
  if (existingproductID.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  const [result] = await db.execute(
    `SELECT BIN_TO_UUID(loanProductID) as loanProductID, productName,description,interestRate,maxAmount,tenureLimit 
    FROM ${TABLE_NAMES.LOAN_PRODUCTS} WHERE loanProductID = ? AND status = 1`,
    [ProductUUID],
  );
  return result;
};
// ########################### UPDATE SINGLE PRODUCT ##############################
const updateProduct = async (id, data) => {
  const ProductUUID = uuidTextToBin(id);
  const { productName, description, interestRate, maxAmount, tenureLimit } =
    data;
  const [existingproductID] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOAN_PRODUCTS} WHERE loanProductID = ? AND status = 1`,
    [ProductUUID],
  );
  if (existingproductID.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }
  await db.execute(
    `UPDATE ${TABLE_NAMES.LOAN_PRODUCTS} SET productName = ? ,description = ?, interestRate = ?, maxAmount =?, tenureLimit =? 
    WHERE loanProductID = ? AND status = 1`,
    [
      productName,
      description,
      interestRate,
      maxAmount,
      tenureLimit,
      ProductUUID,
    ],
  );

  return {
    ProductID: ProductUUID.uuid_text,
    ProductName: productName,
    Description: description,
    InterestRate: interestRate,
    MaxAmount: maxAmount,
    TenureLimit: tenureLimit,
  };
};
// ########################### SOFT DELETE PRODUCT ##############################
const deleteProduct = async (id) => {
  const ProductUUID = uuidTextToBin(id);
  const [existingproductID] = await db.execute(
    `SELECT * FROM ${TABLE_NAMES.LOAN_PRODUCTS} WHERE loanProductID = ? AND status = 1`,
    [ProductUUID],
  );
  if (existingproductID.length === 0) {
    throw new Error(error.RECORD_NOT_FOUND);
  }

  const [result] = await db.execute(
    `UPDATE ${TABLE_NAMES.LOAN_PRODUCTS} SET status = 0 WHERE loanProductID = ?`,
    [ProductUUID],
  );

  return result;
};
module.exports = {
  addProduct,
  allProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
};
