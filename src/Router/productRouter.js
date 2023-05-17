const express = require('express');
const productRouter = express.Router();

const { addProduct, getUserAndProduct } = require('../Controller/productController');








productRouter.post('/add-product', addProduct);
productRouter.get('/get-user-product', getUserAndProduct);

module.exports = productRouter;