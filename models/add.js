const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({

    Name: {
        type: String,
        required: true,
        trim: true
    },
    Description: {
        type: String,
        required:true,
        trim: true
    },
    Price: {
        type: Number,
        required:true,
        trim: true
    },
    IsSold: {
        type: Boolean,
        required:true,
        trim: true
    }}
    );

module.exports = mongoose.model("Product", productSchema, 'products');