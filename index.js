// ===================== Imports ==================
const express = require("express");
const mongoose = require("mongoose");

const  bodyParser  =  require("body-parser")
const cloudinary = require("cloudinary").v2;

const multer = require("multer");
const path = require("path");
const conn = require('./dbConn/conn');
const AuthRoute = require('./routes/Autho');
const AuthUser = require('./routes/user');
const AuthPosts = require('./routes/post');
const AuthCategory = require('./routes/categories');

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/Autho',AuthRoute);
app.use('/users',AuthUser);
app.use('/posts',AuthPosts);
app.use('/category',AuthCategory);
app.use('/', (req,res)=>{
  res.json({message: 'Welcome to blog API'})
})


cloudinary.config({
  cloud_name: "dskrteajn",
  api_key: "578239457146562",
  api_secret: "_vvKJesnIBj_s5sWu6gaedZilDo"
});

const PORT= process.env.PORT

conn()
app.listen(PORT, ()=>{
  console.log("BackEnd Running");
})