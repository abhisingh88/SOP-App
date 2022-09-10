const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
var format = require('date-format');

// Defining Schema
const invoiceSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
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
    cost: {
        type: string
    },
    date: {
        type: Date,
        default: format(Date.now(), "dd-mm-yyyy"),
    },
    reportfile: {
        type: String,
    },
    PFfile: {
        type: String,
    },
    status: {
        type: string
        // dispatched or not
    },
    remark: {
        type: string
        // fast , special report
    },
    isAuthorized: {
        type: string
    }
})

// Defining Collection
const invoiceDetail = new mongoose.model("invoiceDetail", invoiceSchema)

module.exports = invoiceDetail;