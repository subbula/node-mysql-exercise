var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv').config();
const sequelize = require('./config/database');
const CheckNewUsers = require('./cron/usercheck');
const cron = require("node-cron");

var usersRouter = require('./routes/users');
const env = process.env.NODE_ENV || 'development';
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
sequelize.authenticate()
.then(()=>{
    console.log("mysql connection established")
})
.catch((e)=>{
    console.log("connection err",e);
})
app.use('/', usersRouter);

app.listen(3000,()=>{
    console.log("Server runs at localhost:3000/")
})

// cron.schedule('0 0 * * *', async () => {  // runs at the midnight
cron.schedule('* * * * *', async () => {
    console.log('Checking for new users...');
    await CheckNewUsers();
});
module.exports = app;
