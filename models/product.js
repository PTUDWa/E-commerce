const { create } = require("hbs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type: String,
        require: true,
        unique: true,
    },

    image:{
        type: Array,
        default: [],
    },

    thumbnail:{
        type: String,
        default: "",
    },

    price:{
        type: Number,
        default: 0,
        trim: true,
    },

    summary:{
        type: Text,
        default: "",
    },

    inStock:{
        type: Number,
        default: 0
    },

    sold:{
        type: Number,
        default: 0,
    },

    description:{
        type: String,
        default: "",
        require: true,
    },

    // additionalInformation:{
    //     type: Text,
    //     default: "",
    // },

    // review:{
    //     type: Array,
    //     default: [],
    // },

    category:{
        type: Array,
        default: [],
    },

    view:{
        type: Number,
        default: 0,
    },

    createAt:{
        type: Date,
        default: Date.now()
    },

    updateAt:{
        type: Date,
        default: Date.now(),
    }
    
})

module.exports = mongoose.model("product", productSchema)