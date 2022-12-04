const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
var format = require('date-format');

// Defining Schema
const piSchema = new mongoose.Schema({
    piNumber: {
        type: String,
        required: true,
        unique: true
    },
    itNumber:{
        type: String,
        // required: true,
        default:"null"
    },
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
    },
    testData: [
        {
            testType: {
                type: String,
                required: true
            },
            noOfSample: {
                type: String,
                required: true
            },
            cost:{
                type: String,
                required: true
            }
        }
    ],
    totalCost:{
        type:String,
        default:"null",
    },
    year: {
        type: String,
        default: format('yy', new Date()),
        required: true,
    },
    date: {
        type: String,
        default: format('yy-MM-dd hh:mm:ss.SSS',new Date()),
        required: true,
    },
    advancePayment:{
        type: String,
        default:"No"
    },
    mode:{
        type:String,
        default:"null"
    },
    status:{
        type: String,
        default:"null",
    },
    file:{
        type: String,
        default:"null",
    },
    statusOfTr:{
        type: String,
        default:"Not Generated"
    }
})

// Defining Collection
const piDetail = new mongoose.model("piDetail", piSchema)
module.exports = piDetail;