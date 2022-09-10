const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
var format = require('date-format');

// Defining Schema
const piSchema = new mongoose.Schema({
    trNo: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true
    },
    noOfSample: {
        type: String,
        required: true,
    },
    testType: [
        {
            type: String,
            required: true,
        },
    ],
    cost:{
        type:String,
    },
    date: {
        type: Date,
        default:format(Date.now(),"dd-mm-yyyy")
    },
    advancePayment:{
        type: String,
    },
    mode:{
        type:string
    },
    status:{
        type: String,
    },
    file:{
        type: String,
    }
})

// Defining Collection
const piDetail = new mongoose.model("piDetail", piSchema)
module.exports = piDetail;