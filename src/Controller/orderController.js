const Order = require("../Model/orderModel");
const Product = require("../Model/productModel");

const addOrder = async (req, res) => {
  try {
    const { user_id, product_id, quantity, status, total_amount } = req.body;
    const product = await Product.query().where("id", product_id).first();
    if (product) {
      const userId = product.user_id == user_id;
      if (userId) {
        const userOrder = await Order.query().insert({
          user_id,
          product_id,
          quantity,
          status,
          total_amount,
        });
        if (userOrder) {
          res.status(200).send({
            userOrder,
          });
        } else {
          res.status(403).send({
            message: "Something went wrong",
          });
        }
      } else {
        res.status(403).send({
          message: "Invalid userId",
        });
      }
    } else {
      res.status(403).send({
        message: "Invalid productId",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.query()
      .where("orders.id", id)
      .orWhere("orders.user_id", id)
      .orWhere("orders.product_id", id)
      .innerJoin("users", "users.user_id", "orders.user_id")
      .innerJoin("products", "products.user_id", "users.user_id")
      .innerJoin("address", "address.user_id", "products.user_id")
      .select(
        "users.user_id",
        "users.name",
        "users.email",
        "products.id",
        "products.productName",
        "products.productDetails",
        "orders.id",
        "orders.quantity",
        "orders.total_amount",
        "orders.status",
        "orders.order_date",
        "address.address_line1",
        "address.address_line2",
        "address.pincode",
        "address.city",
        "address.state",
        "address.country"
      )
      .first();
    if (!order) {
      res.status(401).send({
        message: "OrderId is invalid",
      });
    } else {
      res.status(200).send({
        order,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const getOrder = await Order.query()
      .innerJoin("users", "users.user_id", "orders.user_id")
      .innerJoin("products", "products.user_id", "users.user_id")
      .innerJoin("address", "address.user_id", "products.user_id")
      .select(
        "users.user_id",
        "users.name",
        "users.email",
        "products.id",
        "products.productName",
        "products.productDetails",
        "orders.id",
        "orders.quantity",
        "orders.total_amount",
        "orders.status",
        "orders.order_date",
        "address.address_line1",
        "address.address_line2",
        "address.pincode",
        "address.city",
        "address.state",
        "address.country"
      );
    if (getOrder) {
      res.status(200).send({
        getOrder,
      });
    } else {
      res.status(401).send({
        message: "Something went wrong"
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};

module.exports = {
  addOrder,
  getOrders,
  getOrderById
};
