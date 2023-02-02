const mongoose = require('mongoose');

const UserShcema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique:true,
    },
    email:{
        type: String,
        require: true,
        unique:true,
    },
    password:{
        type: String,
        require: true,
    },
    profilePic:{
        type: String,
        default: " ",
    },
    
},{
    timestamps:true,
});

module.exports = mongoose.model("users", UserShcema);