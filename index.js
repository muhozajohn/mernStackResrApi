// ===================== Imports ==================
const express = require("express");
const mongoose = require("mongoose");

const  bodyParser  =  require("body-parser")
const cloudinary = require("cloudinary").v2;

const multer = require("multer");
const path = require("path");
// const upload = multer();

const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Imports of Routes
const AuthRoute = require('./routes/Autho');
const AuthUser = require('./routes/user');
const AuthPosts = require('./routes/post');
const AuthCategory = require('./routes/categories');



cloudinary.config({
    cloud_name: "dskrteajn",
    api_key: "578239457146562",
    api_secret: "_vvKJesnIBj_s5sWu6gaedZilDo"
  });

app.use('/Autho',AuthRoute);
app.use('/users',AuthUser);
app.use('/posts',AuthPosts);
app.use('/category',AuthCategory);

// connection
const conn = require('./dbConn/conn');

app.listen("6000", ()=>{
    console.log("BackEnd Running");
})