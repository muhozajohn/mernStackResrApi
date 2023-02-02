const mongoose = require("mongoose");

const Postschema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
    },
    desc: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    categories: {
        type: Array,
        require: true,
    },

},{
    timestamps: true,
}
)
module.exports = mongoose.model("BlogPost" ,Postschema);