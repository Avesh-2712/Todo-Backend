require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.includes('Bearer')
        ? authHeader.split(' ')[1]
        : authHeader;

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).send({
            message: 'Token is expired!!'
          });;
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = authenticateJWT;
