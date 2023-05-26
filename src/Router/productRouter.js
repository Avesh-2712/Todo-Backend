const express = require('express');
const productRouter = express.Router();
const authenticateJWT = require('../Middleware/auth')

const { addProduct, getProductById, getUserAndProduct } = require('../Controller/productController');








productRouter.post('/add-product', addProduct);
productRouter.get('/get-product-by-id/:id', authenticateJWT, getProductById)
productRouter.get('/get-user-product', getUserAndProduct);

module.exports = productRouter;