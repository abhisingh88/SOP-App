const express = require("express");

const ItDetails = require("../../models/itDetails");
const TrDetail = require("../../models/trDetails");
const UserDetail = require("../../models/userModel");
const PiDetail = require("../../models/piDetails");
const InvoiceDetail = require("../../models/invoiceDetails");


async function directorPage(req, res) {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await TrDetail.find({toDirector:"Yes",isAuthorized:"null", suggestion:"null"}).count()) {
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

        let data = await TrDetail.find({toDirector:"Yes",isAuthorized:"null", suggestion:"null"}).sort({trNumber:"desc"}).limit(limit).skip(startIndex)

        res.status(201).render("pages/director/director", { data: data, next: results.next, prev: results.previous });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function getdirectorInovoiceRecords(req, res) {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await InvoiceDetail.find({isAuthorized:"null",paymentStatus:"Completed"}).count()) {
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

        let data = await InvoiceDetail.find({isAuthorized:"null",paymentStatus:"Completed"}).sort({trNumber:"desc"}).limit(limit).skip(startIndex)

        res.status(201).render("pages/director/directorFinalAuthorize", { data: data, next: results.next, prev: results.previous });

    } catch (error) {
        res.status(401).send(error)
    }
};



async function TrlabheadPage(req, res) {
    try {

        userId=req.cookies.userId;
        userData=await UserDetail.findOne({_id:userId})
        userImg=userData.userImage

        pi = req.query.piNo;
        let data = await PiDetail.findOne({ piNumber: pi })

        data.userImage=userImg

        data.counter=data.testData.length

        console.log(data);
        res.status(201).render("pages/labhead/labhead", { data: data });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function PiFinancial(req, res) {
    try {

        userId=req.cookies.userId;
        userData=await UserDetail.findOne({_id:userId})
        userImg=userData.userImage

        it = req.query.itNo;
        let data = await ItDetails.findOne({ itNumber: it })

        data.userImage=userImg
        res.status(201).render("pages/financial/generatePr", { data: data });

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
        res.status(201).render("pages/financial/finance");

    } catch (error) {
        res.status(401).send(error)
    }
};

async function testerPage(req, res) {
    try {
        let userId=req.cookies.userId
        let data=await TrDetail.find({allocatedTo:userId,suggestion:"null"})
        // console.log(data);
        res.status(201).render("pages/tester/tester",{data:data});

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


async function dataFromreceptionToFinance(req, res) {
    try {

        userId=req.cookies.userId;
        userData=await UserDetail.findOne({_id:userId})
        userImg=userData.userImage

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        // const limit=2

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await ItDetails.find({submittedToLabHead: "Yes", statusOfPi: "Not Generated" }).count()) {
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
        let data = await ItDetails.find({submittedToLabHead: "Yes", statusOfPi: "Not Generated" }).sort({Reqdate:"desc",itNumber:"desc"}).limit(limit).skip(startIndex)

        console.log(data);

        data.userImage=userImg
        res.status(201).render("pages/financial/itFromRec_LabHead", { data: data, next: results.next, prev: results.previous });

    } catch (error) {
        res.status(401).send(error)
    }
};


async function getlabheadTrRecords(req, res) {
    try {
        userId=req.cookies.userId;
        userData=await UserDetail.findOne({_id:userId})
        userImg=userData.userImage
        // let data = await TrDetail.find({})
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await TrDetail.count()) {
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

        let data = await TrDetail.find({}).sort({date:"desc", trNumber:"desc"}).limit(limit).skip(startIndex)
        data.userImage=userImg
        console.log(data);
        // console.log(data);

        let testerData = await UserDetail.find({role:"Tester"})
        console.log(testerData);
        res.status(201).render("pages/labhead/labheadRecords", { data: data,testerData:testerData, next: results.next, prev: results.previous });
        // res.status(201).render("pages/labhead/labheadRecords", { data: data });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function getlabheadPiRecords(req, res) {
    try {
        userId=req.cookies.userId;
        userData=await UserDetail.findOne({_id:userId})
        userImg=userData.userImage
        // let data = await TrDetail.find({})
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await PiDetail.count()) {
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

        let data = await PiDetail.find({}).sort({date:"desc", piNumber:"desc"}).limit(limit).skip(startIndex)
        data.userImage=userImg
        // console.log(data);
        res.status(201).render("pages/labhead/prRecordsList", { data: data, next: results.next, prev: results.previous });
        // res.status(201).render("pages/labhead/labheadRecords", { data: data });

    } catch (error) {
        res.status(401).send(error)
    }
};


async function labheadAllocateToTesterPage(req, res) {
    try {
        userId=req.cookies.userId;
        userData=await UserDetail.findOne({_id:userId})
        userImg=userData.userImage
        
        let tr = req.query.trNo
        let data = await TrDetail.findOne({trNumber:tr})
        let testerData = await UserDetail.find({role:"Tester"})
        data.userImage=userImg
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
        // console.log(data);
        res.status(200).render("pages/labhead/labheadTesterAllocate",{success:true, data:data})

    } catch (error) {
        res.status(401).send(error)
    }
};


async function getTestViewSubmission(req, res) {
    try {        
        let tr=req.query.trNo
        let data = await TrDetail.findOne({ trNumber: tr })
        // console.log(data);
        res.status(200).render("pages/tester/testerReport",{data:data})

    } catch (error) {
        res.status(401).send(error)
    }
};
async function getTestViewSubmissionUpdate(req, res) {
    try {        
        let tr=req.query.trNo
        let data = await TrDetail.findOne({ trNumber: tr })
        // console.log(data);
        res.status(200).render("pages/tester/testerReportUpdate",{data:data})

    } catch (error) {
        res.status(401).send(error)
    }
};


async function testViewSubmission(req, res) {
    try {        
        let tr=req.body.trNo
        
        // console.log(req.body.comment);

        let data = await TrDetail.findOneAndUpdate({ trNumber:tr }, {
            filename:req.file.filename,
            status:"Uploaded",
            commentFromTester:req.body.comment,
        })
        // console.log(data);
        res.status(200).render("pages/tester/testerReport",{success:true, data:data})
        
    } catch (error) {
        res.status(401).send(error)
    }
};

async function testViewSubmissionUpdate(req, res) {
    try {        
        let tr=req.body.trNo
        
        // console.log(req.body.comment);

        let data = await TrDetail.findOneAndUpdate({ trNumber:tr }, {
            filename:req.file.filename,
            status:"Uploaded",
            commentFromTester:req.body.comment,
            suggestion:"null",
            toDirector:"null",
        })
        // console.log(data);
        res.status(200).render("pages/tester/testerReport",{success:true, data:data})
        
    } catch (error) {
        res.status(401).send(error)
    }
};


async function reissuedTrDataToTester(req, res) {
    try {        
        // let tr=req.query.trNo

        let data = await TrDetail.find({ allocatedTo:req.cookies.userId,suggestion:{$ne:"null"} })
        // console.log(data);
        res.status(200).render("pages/tester/reissuedTR",{data:data})

    } catch (error) {
        res.status(401).send(error)
    }
};


async function getInvoiceRecords(req, res) {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await TrDetail.find({isAuthorized:"Yes",isInvoiceGen:"null"}).count()) {
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

        let data = await TrDetail.find({isAuthorized:"Yes",isInvoiceGen:"null"}).sort({trNumber:"desc"}).limit(limit).skip(startIndex)
        
        res.status(201).render("pages/financial/invoiceRecordsFinancial", { data: data, next: results.next, prev: results.previous });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function generateInvoiceFinancial(req, res) {
    try {

        let data = await TrDetail.findOne({trNumber:req.query.trNo})
        let piData = await PiDetail.findOne({piNumber:data.piNumber})
        data.piData=piData
        data.counter=data.testData.length
        // console.log(data.counter);
        res.status(201).render("pages/financial/getOneInvoicePage", {data: data});

    } catch (error) {
        res.status(401).send(error)
    }
};

module.exports = {
    director: directorPage,
    getdirectorInovoiceRecords:getdirectorInovoiceRecords,
    createUserPage: createUser,
    reception: receptionPage,
    Trlabhead: TrlabheadPage,
    PiFinancial: PiFinancial,
    finance: financePage,
    tester: testerPage,
    receptionToLabHead: receptionToLabHead,
    dataFromreceptionToFinance: dataFromreceptionToFinance,
    getlabheadTrRecords: getlabheadTrRecords,
    getlabheadPiRecords: getlabheadPiRecords,
    labheadAllocateToTesterPage:labheadAllocateToTesterPage,
    labheadAllocateToTester:labheadAllocateToTester,
    getTestViewSubmission:getTestViewSubmission,
    getTestViewSubmissionUpdate:getTestViewSubmissionUpdate,
    testViewSubmission:testViewSubmission,
    testViewSubmissionUpdate:testViewSubmissionUpdate,
    reissuedTrDataToTester:reissuedTrDataToTester,
    getInvoiceRecords:getInvoiceRecords,
    generateInvoiceFinancial:generateInvoiceFinancial,
}
