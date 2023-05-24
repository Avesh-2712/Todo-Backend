const express = require('express');
const addressRouter = express.Router();

const { addAdress } = require('../Controller/addressController');


addressRouter.post('/add-address', addAdress);

module.exports = addressRouter;