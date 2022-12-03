const express = require("express");

const ItDetails = require("../../models/itDetails");
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
        it = req.query.itNo;
        let data = await ItDetails.findOne({ itNumber: it })
        // console.log(data);
        // res.status(201).render("pages/labhead/labheadTesterAllocate",{data:data});
        res.status(201).render("pages/labhead/labhead", { data: data });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function receptionPage(req, res) {
    try {
        res.status(201).render("pages/reception/reception", { homeActive: true });

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
        let it = req.query.itNo
        let data = await ItDetails.findOne({ itNumber: it })
        res.status(201).render("pages/reception/receptionToLabHead", { data: data, activeITtab: true });

    } catch (error) {
        res.status(401).send(error)
    }
};


async function dataFromreceptionToLabHead(req, res) {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        // const limit=2

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await ItDetails.count()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        let data = await ItDetails.find({ submittedToLabHead: "Yes", statusOfTr: "NotGenerated" }).limit(limit).skip(startIndex)
        res.status(201).render("pages/labhead/itFromRec_LabHead", { data: data, next: results.next, prev: results.previous });

    } catch (error) {
        res.status(401).send(error)
    }
};


async function getlabheadTrRecords(req, res) {
    try {
        let data = await TrDetail.find({})
        res.status(201).render("pages/labhead/labheadRecords", { data: data });

    } catch (error) {
        res.status(401).send(error)
    }
};


async function labheadAllocateToTesterPage(req, res) {
    try {
        let tr = req.query.trNo
        let data = await TrDetail.findOne({trNo:tr})
        let testerData = await UserDetail.find({role:"Tester"})
        res.status(201).render("pages/labhead/labheadTesterAllocate", { data: data, tester:testerData });

    } catch (error) {
        res.status(401).send(error)
    }
};


async function labheadAllocateToTester(req, res) {
    try {
        let tr=req.body.trNo
        let data = await TrDetail.findOneAndUpdate({ trNumber: tr }, {
            allocatedTo:req.body.testerId
        })
        console.log(data);
        res.status(200).render("pages/labhead/labheadTesterAllocate",{success:true})

    } catch (error) {
        res.status(401).send(error)
    }
};

module.exports = {
    director: directorPage,
    createUserPage: createUser,
    reception: receptionPage,
    labhead: labheadPage,
    finance: financePage,
    tester: testerPage,
    receptionToLabHead: receptionToLabHead,
    dataFromreceptionToLabHead: dataFromreceptionToLabHead,
    getlabheadTrRecords: getlabheadTrRecords,
    labheadAllocateToTesterPage:labheadAllocateToTesterPage,
    labheadAllocateToTester:labheadAllocateToTester,
}
