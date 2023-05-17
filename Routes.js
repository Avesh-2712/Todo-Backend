const express = require('express');
const RootRouter = express.Router();
const userRouter = require('./src/Router/userRouter');
const productRouter = require('./src/Router/productRouter');

RootRouter.use('/', userRouter);
RootRouter.use('/', productRouter)


module.exports = RootRouter;