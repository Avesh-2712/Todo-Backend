const express = require("express");
const userRouter = express.Router();

const { adduser, getUser, loginUser } = require('../Controller/userController');

userRouter.get("/", async (req, res) => {
  res.send("Hello World");
});

userRouter.get("/get-all-users", getUser);
userRouter.post("/user-register", adduser);
userRouter.post('/user-login', loginUser)

module.exports = userRouter;
