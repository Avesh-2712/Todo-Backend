const express = require('express');
const RootRouter = express.Router();
const userRouter = require('./src/Router/userRouter');

RootRouter.use('/', userRouter);


module.exports = RootRouter;