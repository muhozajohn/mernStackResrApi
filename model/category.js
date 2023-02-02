const mongoose = require('mongoose');

const CategoryShcema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    
});

module.exports = mongoose.model("category", CategoryShcema);