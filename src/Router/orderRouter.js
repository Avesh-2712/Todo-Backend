const express = require('express');
const orderRouter = express.Router();

const { addOrder, getOrders } = require('../Controller/orderController');


orderRouter.post('/add-order', addOrder);
orderRouter.get('/get-orders', getOrders);

module.exports = orderRouter;