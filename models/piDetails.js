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
        default:"null"
        // required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    testData: [
        {
            testType: {
                type: String,
            },
            noOfSample: {
                type: String,
            },
            cost:{
                type: String,
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
    poDo:{
        type:String,
        default:"No"
    },
    poDoFile:{
        type:String,
        default:"null"
    },
    testReqForm:{
        type:String,
        default:"null"   
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
    },
    statusOfInvoice:{
        type: String,
        default:"Not Generated"
    },
    isPiAccepted:{
        type:String,
        default:"No"
    }
})

// Defining Collection
const piDetail = new mongoose.model("piDetail", piSchema)
module.exports = piDetail;