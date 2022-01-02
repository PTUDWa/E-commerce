const { create } = require("hbs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    productID:{
        type: String,
        require: true,
        //unique: true,
    },

    userID:{
        type: String,
        require: true,
    },

    content:{
        type: String,
        require: true,
    },

    
},{timestamps: true})

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment