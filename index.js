const express = require('express');
const app = express();
const morgan = require('morgan');
//Linkeamos el .env
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('./database');



//Creamos el puerto
const PORT = process.env.PORT || 4000;
//middleware morgan
app.use(morgan('dev'));

app.use('/api',require('./routes'));

app.listen(PORT,()=>{
    console.log("Anda el sv!!");
});