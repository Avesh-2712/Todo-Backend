const Product = require("../Model/productModel");
const User = require("../Model/userModel");

const addProduct = async (req, res) => {
  try {
    const { user_id, productName, productDetails } = req.body;
    const userId = await User.query().where("user_id", user_id).first();
    if (!userId) {
      res.status(403).send({
        message: "Invalid userId",
      });
    } else {
      const product = await Product.query().insert({
        productName: productName,
        productDetails: productDetails,
        user_id: user_id,
      });
      if (product) {
        res.status(200).send({
          product,
          message: "Insert Successfully",
        });
      } else {
        res.status(401).send({
          message: "Something went wrong",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.query()
      .where("products.id", id)
      .orWhere("products.user_id", id)
      .innerJoin("users", "users.user_id", "products.user_id")
      .select(
        "users.user_id",
        "users.name",
        "users.email",
        "products.user_id",
        "products.productName",
        "products.productDetails",
        "products.id"
      )
      .first();
    if (!product) {
      res.status(401).send({
        message: "Invalid Id",
      });
    } else {
      res.status(200).send({
        product,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getUserAndProduct = async (req, res) => {
  try {
    const UserAndProduct = await User.query()
      .innerJoin("products", "products.user_id", "users.user_id")
      .select(
        "users.user_id",
        "users.name",
        "users.email",
        "products.user_id",
        "products.productName",
        "products.productDetails",
        "products.id"
      );
    if (UserAndProduct) {
      res.status(200).send({
        UserAndProduct,
      });
    } else {
      res.status(200).send({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProductById,
  getUserAndProduct,
};
