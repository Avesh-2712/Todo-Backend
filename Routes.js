const express = require('express');
const RootRouter = express.Router();
const userRouter = require('./src/Router/userRouter');
const productRouter = require('./src/Router/productRouter');
const orderRouter = require('./src/Router/orderRouter');
const addressRouter = require('./src/Router/addressRouter');

RootRouter.use('/', userRouter);
RootRouter.use('/', productRouter);
RootRouter.use('/', orderRouter);
RootRouter.use('/', addressRouter);

module.exports = RootRouter;