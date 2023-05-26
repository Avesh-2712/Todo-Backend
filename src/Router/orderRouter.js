const express = require('express');
const orderRouter = express.Router();

const { addOrder, getOrders, getOrderById } = require('../Controller/orderController');


orderRouter.post('/add-order', addOrder);
orderRouter.get('/get-orders', getOrders);
orderRouter.get('/get-order-by-id/:id', getOrderById);

module.exports = orderRouter;