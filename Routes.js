const express = require('express');
const RootRouter = express.Router();
const userRouter = require('./src/Router/userRouter');
const productRouter = require('./src/Router/productRouter');
const orderRouter = require('./src/Router/orderRouter')

RootRouter.use('/', userRouter);
RootRouter.use('/', productRouter);
RootRouter.use('/', orderRouter);

module.exports = RootRouter;