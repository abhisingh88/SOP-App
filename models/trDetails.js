const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var format = require("date-format");

// Defining Schema
const trSchema = new mongoose.Schema({
    trNumber: {
        type: String,
        required: true,
        unique: true
    },
    piNumber: {
        type: String,
        required: true,
        unique:true,
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
            }
        }
    ],
    contact: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        // default: format(Date.now(), "dd-mm-yyyy"),
        default: format('yy-MM-dd hh:mm:ss.SSS', new Date()),
        null: false,
    },
    year: {
        type: String,
        default: format('yy', new Date()),
        required: true,
    },
    receivedBy: {
        type: String,
        default:"null",
    },
    filename: {
        type: String,
        default:"null"
    },
    allocatedTo: {
        type: String,
        default:"null"
    },
    parentTr: {
        type: String,
        default:"null",
    },
    status: {
        type: String,
        default:"null"
    },
    suggestion: {
        type: String,
        default:"null"
    },
    remark: {
        type: String,
        default:"null"
    },
    commentFromTester:{
        type: String,
        default:"null"
    },
    toDirector: {
        type: String,
        default:"null"
    },
    isAuthorized: {
        type: String,
        default:"null"
    },
    isInvoiceGen: {
        type: String,
        default:"null"
    }
});

// Defining Collection
const trDetail = new mongoose.model("trDetail", trSchema);

module.exports = trDetail;
