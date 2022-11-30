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
    companyName: {
        type: String,
        required: true,
    },
    noOfSample: {
        type: String,
        required: true,
    },
    // testType: [
    //     {
    //         type: String,
    //         required: true,
    //     },
    // ],
    testType: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        // default: format(Date.now(), "dd-mm-yyyy"),
        default: format('yy-MM-dd hh:mm:ss.SSS', new Date()),
        null:false,
    },
    year: {
        type: String,
        default: format('yy', new Date()),
        required: true,
    },
    receivedBy: {
        type: String,
    },
    filename: {
        type: String,
    },
    parentTr: {
        type: String,
    },
    status: {
        type: String
    },
    suggestion: {
        type: String
    },
    remark: {
        type: String
    },
    isAuthorized: {
        type: String
    }
});

// Defining Collection
const trDetail = new mongoose.model("trDetail", trSchema);

module.exports = trDetail;
