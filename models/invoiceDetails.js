const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
var format = require('date-format');

// Defining Schema
const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    trNumber: {
        type: String,
        required: true,
        unique: true
    },
    companyName: {
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
            cost: {
                type: String,
                required: true
            }
        }
    ],
    totalCost: {
        type: String,
        default: "null"
    },
    paymentStatus: {
        type: String,
        default: "null"
    },
    date: {
        type: String,
        default: format('yy-MM-dd hh:mm:ss.SSS', new Date()),
        required: true,
    },
    
    year:{
        type: String,
        default: format('yy',new Date()),
        required: true,
    },
    reportfile: {
        type: String,
        default:"null"
    },
    PFfile: {
        type: String,
        default:"null"
    },
    status: {
        type: String,
        default:"null"
        // dispatched or not
    },
    remark: {
        type: String,
        default:"null"
        // fast , special report
    },
    isAuthorized: {
        type: String,
        default:"null"
    }
})

// Defining Collection
const invoiceDetail = new mongoose.model("invoiceDetail", invoiceSchema)

module.exports = invoiceDetail;