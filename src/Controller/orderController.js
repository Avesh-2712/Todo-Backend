const Order = require("../Model/orderModel");
const Product = require("../Model/productModel");

const addOrder = async (req, res) => {
  try {
    const { user_id, product_id, quantity, status, total_amount } = req.body;
    const product = await Product.query().where("id", product_id).first();
    if (product) {
      const userId = product.user_id == user_id;
      if (userId) {
        const userOrder = await Order.query().insert({ user_id, product_id, quantity, status, total_amount });
        if (userOrder) {
          res.status(200).send({
            userOrder
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

const getOrders = async (req, res) => {
  const getOrder = await Order.query()
    .innerJoin("users", "users.user_id", "orders.user_id")
    .innerJoin("products", "products.user_id", "users.user_id")
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
      "orders.order_date"
    );
  if (getOrder) {
    res.send(getOrder);
  } else {
    res.send("Something went wrong");
  }
};

module.exports = {
  addOrder,
  getOrders,
};
