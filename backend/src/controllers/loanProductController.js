const { success, error } = require("../constants/messages");
const productService = require("../services/loanProductsServices");
const response = require("../constants/response");

const addProduct = async (req, res) => {
  try {
    const data = req.body;

    const result = await productService.addProduct(data);

    return res
      .status(201)
      .json(response.successRes(201, success.PRODUCT_ADDED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const allProducts = async (req, res) => {
  try {
    const result = await productService.allProducts();

    return res
      .status(200)
      .json(response.successRes(200, success.PRODUCTS_LIST, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const singleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productService.singleProduct(id);

    return res
      .status(200)
      .json(response.successRes(200, success.SINGLE_PRODUCT, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await productService.updateProduct(id, data);

    return res
      .status(200)
      .json(response.successRes(200, success.PRODUCT_UPDATED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productService.deleteProduct(id);
    return res
      .status(200)
      .json(response.successRes(200, success.PRODUCT_DELETED, result));
  } catch (error) {
    return res.status(400).json(response.errorRes(400, error.message));
  }
};
module.exports = {
  addProduct,
  allProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
};
