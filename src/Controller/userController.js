const User = require('../Model/userModel');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken')

const adduser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const hashpassword = bcrypt.hashSync(req.body.password, 10)
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
          user_id: insertUser.user_id, name: insertUser.name, email: insertUser.email
        });
      } else {
        res.status(500).send({
          message: "Something went wrong",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      error: error.message
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
      });
    } else {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        res.send({
          message: "Password is incorrect!!"
        });
      } else {
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1 hours'})
        res.status(200).send({
          user, token
        });
      }      
    }
  } catch (error) {
    res.status(500).send({
        error: error.message
    })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.query().select('users.user_id', 'users.name', 'users.email');
    if(user) {
      res.status(200).send({
        user
      });
    }
    else {
      res.status(403).send({
        message: "Something wrong"
      })
    }
  } catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};

module.exports = {
  adduser,
  getUser,
  loginUser
};