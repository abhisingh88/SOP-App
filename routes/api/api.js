// const express = require("express");
const conn = require("../../db/conn");
var format = require('date-format');

const UserDetail = require("../../models/userModel");
const ItDetail = require("../../models/itDetails");
const TrDetail = require("../../models/trDetails");
const PiDetails = require("../../models/piDetails");
const InvoiceDetails = require("../../models/invoiceDetails");



async function createUser(req, res) {
    try {
        // user_img = req.file
        const registerUser = new UserDetail({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            userImage:req.file.filename
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
        res.status(201).render("pages/director/createUserPage", { success: true });
    } catch (error) {
        res.status(401).send(error)
    }
};

async function itDetails(req, res) {
    try {

        let it = "IT-"
        it += format.asString('yy-MM-dd', new Date());
        // let dated=format('yy-MM-dd', new Date());
        let year = format('yy', new Date());;
        var count = await ItDetail.count({ year: year })
        if (count == 0) {
            count = 1;
        } else {
            count += 1
        }
        it += "-";
        count = count.toString();
        // console.log(typeof(count));
        // console.log(count);
        it += count;

        console.log(it);

        const itDetail = new ItDetail({
            itNumber: it,
            companyName: req.body.companyName,
            personName: req.body.person,
            contact: req.body.contact,
        })
        const itStatus = await itDetail.save();
        console.log(itStatus);
        res.redirect('/user/itdata?success=' + true + "&itNo=" + it);
        // res.status(201).render("pages/reception", { success: true, itNo:it });
        // res.status(201).render("data/itDetailsCount");

    } catch (error) {
        res.status(401).send(error)
    }
};



async function trDetails(req, res) {
    try {

        let tr = "TR-"
        tr += format.asString('yy-MM-dd', new Date());
        let year = format('yy', new Date());;
        var count = await TrDetail.count({ year: year })
        if (count == 0) {
            count = 1;
        } else {
            count += 1
        }
        tr += "-";
        count = count.toString();
        tr += count;


        let counter=parseInt(req.body.counter)
        let testData=[]
        for (let i = 0; i < counter; i++) {
            let obj={
                testType:req.body.testType[i],
                noOfSample:req.body.noOfSample[i]
            }
            testData.push(obj);
        }


        const trDetail = new TrDetail({
            trNumber:tr,
            piNumber: req.body.piNumber,
            companyName: req.body.companyName,
            testData:testData,
            receivedBy: req.body.receivedBy,
            contact: req.body.contact,
        })
        const trStatus = await trDetail.save();

        let data = await PiDetails.findOneAndUpdate({ piNumber: req.body.piNumber }, {
            statusOfTr: "Generated"
        })

        console.log(trStatus);
        res.redirect('/user/trdata?success=' + true + "&trNo=" + tr);


        // res.status(201).render("pages/reception", { success: true, itNo:it });
        // res.status(201).render("data/itDetailsCount");

    } catch (error) {
        res.status(401).send(error)
    }
};


async function piDetails(req, res) {
    try {

        let pi = "Pi-"
        pi += format.asString('yy-MM-dd', new Date());
        let year = format('yy', new Date());;
        var count = await PiDetails.count({ year: year })
        if (count == 0) {
            count = 1;
        } else {
            count += 1
        }
        pi += "-";
        count = count.toString();
        pi += count;

        
        let counter=parseInt(req.body.counter)
        let testData=[]

        for (let i = 0; i < counter; i++) {
            let obj={
                testType:req.body.testType[i],
                noOfSample:req.body.noOfSample[i],
                cost:req.body.cost[i]
            }
            testData.push(obj);
        }

        // console.log(testData);
        // console.log(req.body.itNumber);
        const piDetail = new PiDetails({
            piNumber:pi,
            itNumber: req.body.itNumber,
            companyName: req.body.companyName,
            contact: req.body.contact,
            testData:testData,
            totalCost:req.body.totalCost,
            advancePayment:req.body.advancePayment,
        })
        const piStatus = await piDetail.save();
        // console.log(piStatus);
        let data = await ItDetail.findOneAndUpdate({ itNumber: req.body.itNumber }, {
            statusOfPi: "Generated"
        })

        // console.log(data);
        res.redirect('/user/pidata?success=' + true + "&piNo=" + pi);



    } catch (error) {
        res.status(400).send("Error occureed plz try again!!")
    }
};


async function invoiceDetails(req, res) {
    try {
        let inNo = "INV-"
        inNo += format.asString('yy-MM-dd', new Date());
        let year = format('yy', new Date());;
        var count = await InvoiceDetails.count({ year: year })
        if (count == 0) {
            count = 1;
        } else {
            count += 1
        }
        inNo += "-";
        count = count.toString();
        inNo += count;

        let counter=parseInt(req.body.counter)
        let testData=[]
        for (let i = 0; i < counter; i++) {
            let obj={
                testType:req.body.testType[i],
                noOfSample:req.body.noOfSample[i],
                cost:req.body.cost[i]
            }
            testData.push(obj);
        }
        console.log(req.body);

        const inDetail = new InvoiceDetails({
            invoiceNumber:inNo,
            trNumber: req.body.trNumber,
            companyName: req.body.companyName,
            contact: req.body.contact,
            testData:testData,
            totalCost:req.body.totalCost,
            advancePayment:req.body.advancePayment,
            paymentStatus:req.body.paymentStatus,
        })
        console.log("done");
        const inStatus = await inDetail.save();
        console.log(inStatus);
        let data = await TrDetail.findOneAndUpdate({ trNumber: req.body.trNumber }, {
            isInvoiceGen: "Generated"
        })
        res.redirect('/user/invoicedata?success=' + true + "&inNo=" + inNo);


    } catch (error) {
        res.status(500).send(error)
    }
};

async function updateItStatus(req, res) {
    try {
        let it = req.query.itNo
        // console.log(it);
        let data = await ItDetail.findOneAndUpdate({ itNumber: it }, {
            submittedToLabHead: "Yes"
        })
        console.log(data);
        res.status(201).render("pages/reception/receptionToLabHead", { data: data, success: true , activeITtab:true});

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

async function piDetailsRes(req, res) {
    try {
        res.json(res.paginatedResult)
    } catch (error) {
        res.status(500).send(error)
    }
};

async function itDetailsRes(req, res) {
    try {
        res.status(201).render("pages/reception/receptionItRecords", { data: res.paginatedResult.results, next: res.paginatedResult.next, prev: res.paginatedResult.previous , activeITtab:true});

    } catch (error) {
        res.status(500).send(error)
    }
};

async function itDetailsRes(req, res) {
    try {
        res.status(201).render("pages/reception/receptionItRecords", { data: res.paginatedResult.results, next: res.paginatedResult.next, prev: res.paginatedResult.previous , activeITtab:true});

    } catch (error) {
        res.status(500).send(error)
    }
};

async function submittedItDetailsRes(req, res) {
    try {
        res.status(201).render("pages/reception/submittedReceptionItRecords", { data: res.paginatedResult.results, next: res.paginatedResult.next, prev: res.paginatedResult.previous , activeSubmittedITtab:true});

    } catch (error) {
        res.status(500).send(error)
    }
};

async function trDetailssRes(req, res) {
    try {
        // res.json(res.paginatedResult)
        res.status(201).render("pages/labhead/labheadRecords", { data: res.paginatedResult.results, next: res.paginatedResult.next, prev: res.paginatedResult.previous });
    } catch (error) {
        res.status(500).send(error)
    }
};

async function completedTestReports(req, res) {
    try {
        // res.json(res.paginatedResult)

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await TrDetail.find({status:"Uploaded",toDirector:"null"}).count()) {
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

        let data = await TrDetail.find({status:"Uploaded", $and:[{toDirector:"null"},{suggestion:"null"}]}).sort({trNumber:"desc"}).limit(limit).skip(startIndex)

        res.status(201).render("pages/labhead/submittedTestReport", { data: data, next: results.next, prev: results.previous });
    } catch (error) {
        res.status(500).send(error)
    }
};

async function getApprovalReportPage(req, res) {
    try {
        // res.json(res.paginatedResult)
        let tr= req.query.trNo
        let data= await TrDetail.findOne({trNumber:tr})
        res.status(201).render("pages/director/approve_retest", {data:data});
    } catch (error) {
        res.status(500).send(error)
    }
};

async function getVerifyReportPage(req, res) {
    try {
        // res.json(res.paginatedResult)
        let tr= req.query.trNo
        let data= await TrDetail.findOne({trNumber:tr})
        res.status(201).render("pages/labhead/labheadVerifyReport", {data:data});
    } catch (error) {
        res.status(500).send(error)
    }
};

async function retestToLabTester(req, res) {
    try {
        let tr= req.body.trNo
        let data= await TrDetail.findOneAndUpdate({trNumber:tr},{
            suggestion:req.body.suggestion
        })
        console.log(data);
        res.redirect("/user/completedTestReports?page=1&limit=7")
    } catch (error) {
        res.status(500).send(error)
    }
};

async function sendToDiretor(req, res) {
    try {
        let tr= req.body.trNo
        let data= await TrDetail.findOneAndUpdate({trNumber:tr},{
            toDirector:"Yes"
        })
        // res.status(201).render("pages/labhead/labheadVerifyReport", {data:data});
        res.redirect("/user/completedTestReports?page=1&limit=7")
    } catch (error) {
        res.status(500).send(error)
    }
};


async function trApprovalDirector(req, res) {
    try {
        let tr= req.body.trNo
        let data= await TrDetail.findOneAndUpdate({trNumber:tr},{
            isAuthorized:"Yes"
        })
        console.log(data);
        res.redirect("/user/director?page=1&limit=7")
    } catch (error) {
        res.status(500).send(error)
    }
};


async function retestDirector(req, res) {
    try {
        let tr= req.body.trNo
        let data= await TrDetail.findOneAndUpdate({trNumber:tr},{
            suggestion:req.body.suggestion
        })
        console.log(data);
        res.redirect("/user/director?page=1&limit=7")
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
    updateItStatus: updateItStatus,
    invoiceDetailsRes: invoiceDetailsRes,
    trDetailssRes: trDetailssRes,
    piDetailsRes: piDetailsRes,
    itDetailsRes: itDetailsRes,
    submittedItDetailsRes:submittedItDetailsRes,
    completedTestReports:completedTestReports,
    getVerifyReportPage:getVerifyReportPage,
    sendToDiretor:sendToDiretor,
    retestToLabTester:retestToLabTester,
    getApprovalReportPage:getApprovalReportPage,
    trApprovalDirector:trApprovalDirector,
    retestDirector:retestDirector,
}