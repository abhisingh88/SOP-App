// const express = require("express");
const conn = require("../../db/conn");
const UserDetail = require("../../models/userModel")
const bcrypt = require("bcryptjs")

// async function getSignUpPage(req, res) {
//     try {
//         res.status(201).render("login/signUpPage");

//     } catch (error) {
//         res.status(401).send(error)
//     }
// };



async function getLoginPage(req, res) {
    try {
        res.status(201).render("login/loginPage");

    } catch (error) {
        res.status(401).send(error)
    }
};



async function loginUser(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password
        
        const user = await UserDetail.findOne({ email: email })
        const token = await user.generateAuthToken();

        res.cookie("sop", token, {
            expires: new Date(Date.now() + 72000000),
            httpOnly: true,
            // secure:true   //works on https only
        })

        const isMatch = bcrypt.compare(password, user.password)

        if (isMatch) {
            if(user.role=="Director"){
                res.redirect('/user/director');
            }
            if(user.role=="Reception"){
                res.redirect('/user/reception');
            }
            if(user.role=="LabHead"){
                res.redirect('/user/labhead');
            }
            if(user.role=="Tester"){
                res.redirect('/user/tester');
            }
            if(user.role=="Finance"){
                res.redirect('/user/finance');
            }
        } else {
            res.send("Invalid email or passwords")
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



module.exports = {
    // getSignUpPage: getSignUpPage,
    getLoginPage: getLoginPage,
    loginUser: loginUser,
    logoutUser: logoutUser
}
