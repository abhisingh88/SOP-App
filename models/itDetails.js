const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
var format = require('date-format');
// const dateFor = require('date-and-time')

// Defining Schema
const itSchema = new mongoose.Schema({
    itNumber:{
        type: String,
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: true
    },
    personName: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true
    },
    Reqdate: {
        type: String,
        default: format('yy-MM-dd hh:mm:ss.SSS',new Date()),
        required: true,
    },
    year:{
        type: String,
        default: format('yy',new Date()),
        required: true,
    },
    submittedToLabHead:{
        type: String,
        default:"NO",
    },
    statusOfTr:{
        type: String,
        default:"Not Generated"
    },
    statusOfPi:{
        type: String,
        default:"Not Generated"
    }
})

// Defining Collection

const itDetail = new mongoose.model("itDetail", itSchema)

module.exports = itDetail;