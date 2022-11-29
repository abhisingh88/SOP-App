// const express = require("express");
const conn = require("../../db/conn");
const multer = require("multer")
var format = require('date-format');


const UserDetail = require("../../models/userModel");
const ItDetail = require("../../models/itDetails");

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
        res.cookie("sop", token, {
            expires: new Date(Date.now() + 72000000),
            httpOnly: true
        })

        // console.log("saved");

        const register = await registerUser.save();
        console.log(register);
        // res.status(201).render("internal/internal", { success: true })
        // res.redirect('/user/createUserPage');
        // res.status(202).send(register)
        res.status(201).render("pages/createUserPage", { success: true });
    } catch (error) {
        res.status(401).send(error)
    }
};

async function itDetails(req, res) {
    try {

        let it="IT-"
        it+=format.asString('yy-MM-dd', new Date());
        // let dated=format('yy-MM-dd', new Date());
        let year=format('yy', new Date());;
        var count = await ItDetail.count({year:year})
        if(count==0){
            count=1;
        }else{
            count+=1
        }
        it+="-";
        count = count.toString();
        // console.log(typeof(count));
        // console.log(count);
        it+=count;

        console.log(it);

        const itDetail = new ItDetail({
            itNumber:it,
            companyName: req.body.companyName,
            personName: req.body.person,
            contact: req.body.contact,
        })
        const itStatus = await itDetail.save();
        console.log(itStatus);
        res.redirect('/user/data?success='+true+"&itNo="+it);
        // res.status(201).render("pages/reception", { success: true, itNo:it });
        // res.status(201).render("data/itDetailsCount");

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



async function invoiceDetailsRes(req, res) {
    try {
        res.json(res.paginatedResult)
    } catch (error) {
        res.status(500).send(error)
    }
};
async function itDetailsRes(req, res) {
    try {
        // res.json(res.paginatedResult)
        // console.log(res.paginatedResult);
        // console.log("from it: ", res.paginatedResult);
        // console.log("from next: ", res.paginatedResult.next);
        // console.log("from prev: ", res.paginatedResult.previous);

        res.status(201).render("pages/receptionItRecords", {data:res.paginatedResult.results,next:res.paginatedResult.next, prev:res.paginatedResult.previous});
        
    } catch (error) {
        res.status(500).send(error)
    }
};
async function piDetailsRes(req, res) {
    try {
        res.json(res.paginatedResult)
    } catch (error) {
        res.status(500).send(error)
    }
};
async function trDetailssRes(req, res) {
    try {
        res.json(res.paginatedResult)
    } catch (error) {
        res.status(500).send(error)
    }
};

async function updateItStatus(req, res) {
    try {
        let it=req.query.itNo
        // console.log(it);
        let data = await ItDetail.findOneAndUpdate({itNumber:it},{
            submittedToLabHead:"Yes"
        })
        console.log(data);
        res.status(201).render("pages/receptionToLabHead", {data:data, success: true });

    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = {
    itDetails: itDetails,
    trDetails: trDetails,
    createUser: createUser,
    piDetails: piDetails,
    invoiceDetails: invoiceDetails,
    invoiceDetailsRes:invoiceDetailsRes,
    trDetailssRes:trDetailssRes,
    piDetailsRes:piDetailsRes,
    itDetailsRes:itDetailsRes,
    updateItStatus:updateItStatus,
}