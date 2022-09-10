const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var format = require("date-format");

// Defining Schema
const trSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        default: format(Date.now(), "dd-mm-yyyy"),
    },
    receivedBy: {
        type: String,
    },
    time: {
        type: String,
    },
    filename: {
        type: String,
    },
    parentTr:{
        type:String,
    },
    status:{
        type:string
    },
    suggestion:{
        type:string
    },
    remark:{
        type:string
    },
    isAuthorized:{
        type:string
    }
});

// Defining Collection
const trDetail = new mongoose.model("trDetail", trSchema);

module.exports = trDetail;
