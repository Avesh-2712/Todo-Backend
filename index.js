require('dotenv').config();
const express = require('express');
const app = express();
const RootRouter = require('./Routes');

app.use(express.json());
app.use(RootRouter);

app.listen(process.env.PORT, () => {
    console.log(`Your server is running on http://localhost:${process.env.PORT}`);
});