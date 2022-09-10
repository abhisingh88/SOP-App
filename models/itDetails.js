const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
var format = require('date-format');

// Defining Schema
const itSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    personName: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default:format(Date.now(),"dd-mm-yyyy")
        // required: true,
    },
    submittedToLabHead:{
        type: String,
    },
    testType:{
        type: String,
    },
    status:{
        type: String,
    }
})

// Defining Collection

const itDetail = new mongoose.model("itDetail", itSchema)

module.exports = itDetail;