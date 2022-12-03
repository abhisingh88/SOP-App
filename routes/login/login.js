// const express = require("express");
const conn = require("../../db/conn");
const UserDetail = require("../../models/userModel")
const bcrypt = require("bcryptjs")

async function getLoginPage(req, res) {
    try {
        res.status(201).render("getLoginPage");

    } catch (error) {
        res.status(401).send(error)
    }
};



async function loginUser(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password

        const user = await UserDetail.findOne({ email: email })
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = await user.generateAuthToken();

            res.cookie("sop", token, {
                expires: new Date(Date.now() + 72000000),
                httpOnly: true,
                // secure:true   //works on https only
            })


            if (user.role == "Director") {
                res.redirect('/user/director?id='+user._id);
            }
            if (user.role == "Reception") {
                res.redirect('/user/reception?id='+user._id);
            }
            if (user.role == "LabHead") {
                // res.redirect('/user/labhead?id='+user._id);
                res.redirect('/user/dataOfItLab?id='+user._id+"&page=1&limit=4");
            }
            if (user.role == "Tester") {
                res.redirect('/user/tester?id='+user._id);
            }
            if (user.role == "Finance") {
                res.redirect('/user/finance?id='+user._id);
            }
        } else {
            // res.send("Invalid email or passwords")
            res.redirect('/error');
        }

    } catch (error) {
        res.status(400).send("Error occurred...please try again!!")
    }
};


async function logoutUser(req, res) {
    try {

        req.user.tokens = req.user.tokens.filter((elem) => {
            return elem.token != req.token
        })

        res.clearCookie("sop")

        console.log("Logout Successful!!");

        await req.user.save()
        res.redirect("/")

    } catch (error) {
        res.status(500).send(error)
    }
};

async function geterrorPage(req, res) {
    try {
        res.status(201).render("pages/error");

    } catch (error) {
        res.status(401).send(error)
    }
};

module.exports = {
    getLoginPage: getLoginPage,
    loginUser: loginUser,
    logoutUser: logoutUser,
    errorPage: geterrorPage
}
