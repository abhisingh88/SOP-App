const express = require("express");

const ItDetails= require("../../models/itDetails");
const UserDetail = require("../../models/userModel");
async function directorPage(req, res) {
    try {
        res.status(201).render("pages/director");

    } catch (error) {
        res.status(401).send(error)
    }
};



async function labheadPage(req, res) {
    try {
        id=req.query.id;
        let data= await UserDetail.findOne({_id:id})
        console.log(data);
        res.status(201).render("pages/labhead",{data:data});

    } catch (error) {
        res.status(401).send(error)
    }
};

async function receptionPage(req, res) {
    try {
        res.status(201).render("pages/reception");

    } catch (error) {
        res.status(401).send(error)
    }
};

async function receptionDataMiddleware(req, res) {
    try {
        let success=req.query.success
        let it=req.query.itNo
        // console.log("reached");
        res.status(201).render("pages/reception", { success: success, itNo:it });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function receptionToLabHead(req, res) {
    try {
        let it=req.query.itNo
        // console.log("it no: ",it);
        let data=await ItDetails.findOne({itNumber:it})
        // console.log(data);
        res.status(201).render("pages/receptionToLabHead",{data:data});

    } catch (error) {
        res.status(401).send(error)
    }
};



async function financePage(req, res) {
    try {
        res.status(201).render("pages/finance");

    } catch (error) {
        res.status(401).send(error)
    }
};

async function testerPage(req, res) {
    try {
        res.status(201).render("pages/tester");

    } catch (error) {
        res.status(401).send(error)
    }
};

async function createUser(req, res) {
    try {
        res.status(201).render("pages/createUserPage");

    } catch (error) {
        res.status(401).send(error)
    }
};


module.exports = {
    director: directorPage,
    createUserPage:createUser,
    reception: receptionPage,
    receptionDataMiddleware:receptionDataMiddleware,
    receptionToLabHead:receptionToLabHead,
    labhead: labheadPage,
    finance: financePage,
    tester: testerPage,
}
