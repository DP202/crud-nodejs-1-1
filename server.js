const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const PORT = 9090;
const connectDB = require('./src/configs/database');

const routers = require('./src/routers');
app.use(express.json()); // xử lý json req body
app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");

app.use(express.static('./uploads'));

connectDB();

routers(app);

app.listen(PORT, () => {
  console.log('Server run Port : ', PORT);
});
