const User = require('../Model/userModel');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken')

const adduser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const hashpassword = await bcrypt.hashSync(req.body.password, 10)
    const user = await User.query().where({'email': email}).first();
    if (user) {
      res.status(401).send({
        message: "Email is already exits!!",
      });
    } else {
      const insertUser = await User.query().insert({
        email: email,
        name: name,
        password: hashpassword
      });
      if (insertUser) {
        res.status(200).send({
          success: true,
          res: insertUser,
          message: "Insert Successfully",
        });
      } else {
        res.status(500).send({
          message: "Something went wrong",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.query().where('email', email).first();
    if (!user) {
      res.send({
        message: "Email is invalid!! please enter Valid email!",
      })
    } else {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        res.send({
          message: "Password is incorrect!!",
        });
      } else {
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
        res.status(200).send({
          user, token
        })
      }      
    }
  } catch (error) {
    res.status(500).send({
      success: false,
        error: error.message,
        stack: error.stack
    })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.query();
    if(user){
      res.send (user)
    }
    else{
      res.send("Something wrong")
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
};

module.exports = {
  adduser,
  getUser,
  loginUser
};
