const express = require('express');
const app = express();
const morgan = require('morgan');
var cors = require('cors');
const nodemailer = require("nodemailer");
//Linkeamos el .env
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('./database');



//Creamos el puerto
const PORT = process.env.PORT || 4000;
//middleware morgan
app.use(morgan('dev'));

app.use('/api',require('./routes'));
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});

app.listen(PORT,()=>{
    console.log("Anda el sv!!");
});