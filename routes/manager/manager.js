const express = require("express");

const ItDetails= require("../../models/itDetails");
const TrDetail = require("../../models/trDetails");
const UserDetail = require("../../models/userModel");
async function directorPage(req, res) {
    try {
        res.status(201).render("pages/director/director");

    } catch (error) {
        res.status(401).send(error)
    }
};



async function labheadPage(req, res) {
    try {
        it=req.query.itNo;
        let data= await ItDetails.findOne({itNumber:it})
        console.log(data);
        // res.status(201).render("pages/labhead/labheadTesterAllocate",{data:data});
        res.status(201).render("pages/labhead/labhead",{data:data});

    } catch (error) {
        res.status(401).send(error)
    }
};

async function receptionPage(req, res) {
    try {
        res.status(201).render("pages/reception/reception");

    } catch (error) {
        res.status(401).send(error)
    }
};


async function financePage(req, res) {
    try {
        res.status(201).render("pages/financal/finance");

    } catch (error) {
        res.status(401).send(error)
    }
};

async function testerPage(req, res) {
    try {
        res.status(201).render("pages/tester/tester");

    } catch (error) {
        res.status(401).send(error)
    }
};

async function createUser(req, res) {
    try {
        res.status(201).render("pages/director/createUserPage");

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
        res.status(201).render("pages/reception/receptionToLabHead",{data:data});

    } catch (error) {
        res.status(401).send(error)
    }
};


async function dataFromreceptionToLabHead(req, res) {
    try {
        let data=await ItDetails.find({submittedToLabHead:"Yes"})
        // console.log(data);
        res.status(201).render("pages/labhead/itFromRec_LabHead",{data:data});

    } catch (error) {
        res.status(401).send(error)
    }
};


async function getlabheadTrRecords(req, res) {
    try {
        let data=await TrDetail.find({})
        res.status(201).render("pages/labhead/labheadRecords",{data:data});

    } catch (error) {
        res.status(401).send(error)
    }
};

module.exports = {
    director: directorPage,
    createUserPage:createUser,
    reception: receptionPage,
    labhead: labheadPage,
    finance: financePage,
    tester: testerPage,
    receptionToLabHead:receptionToLabHead,
    dataFromreceptionToLabHead:dataFromreceptionToLabHead,
    getlabheadTrRecords:getlabheadTrRecords,
}
