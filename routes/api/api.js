const express = require("express");
const conn = require("../../db/conn");
const multer = require("multer")
const UserDetail = require("../../models/userModel")


async function createUser(req, res) {
    try {

        const registerUser = new UserDetail({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role:req.body.role
        })
        // console.log(registerUser.username)
        const token = await registerUser.generateAuthToken();

        // console.log(token);
        res.cookie("internal", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true
        })

        // console.log("saved");

        const register = await registerUser.save();
        console.log(register);
        // res.status(201).render("internal/internal", { success: true })
        res.redirect('/user/login');
    } catch (error) {
        res.status(401).send(error)
    }
};

async function itDetails(req, res) {
    try {
        res.status(201).render("login/loginPage");

    } catch (error) {
        res.status(401).send(error)
    }
};



async function trDetails(req, res) {
    try {

        const registerUser = new Internal({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        // console.log(registerUser.username)
        const token = await registerUser.generateAuthToken();

        // console.log(token);
        res.cookie("internal", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true
        })

        // console.log("saved");

        const register = await registerUser.save();
        console.log(register);

        // res.status(201).render("internal/internal", { success: true })
        res.redirect('/internal');
    } catch (error) {
        res.status(401).send(error)
    }
};


async function piDetails(req, res) {
    try {

        const email = req.body.email
        const password = req.body.password
        const useremail = await Internal.findOne({ email: email })
        const token = await useremail.generateAuthToken();

        res.cookie("internal", token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true,
            // secure:true   //works on https only
        })
        const isMatch = bcrypt.compare(password, useremail.password)

        if (isMatch) {
            // res.status(201).render("internal/internal")
            res.redirect('/internal');
        } else {
            res.send("Invalid email or passwords")
        }

    } catch (error) {
        res.status(400).send("Error occureed plz try again!!")
    }
};


async function invoiceDetails(req, res) {
    try {

        req.user.tokens = req.user.tokens.filter((elem) => {
            return elem.token != req.token
        })

        res.clearCookie("internal")

        console.log("Logout Successfully!!");

        await req.user.save()
        res.redirect("/user/loginPage")

    } catch (error) {
        res.status(500).send(error)
    }
};



module.exports = {
    itDetails: itDetails,
    trDetails: trDetails,
    createUser: createUser,
    piDetails: piDetails,
    invoiceDetails: invoiceDetails
}