const conn = require("../../db/conn");
var format = require('date-format');

const UserDetail = require("../../models/userModel");
const ItDetail = require("../../models/itDetails");
const TrDetail = require("../../models/trDetails");
const PiDetail = require("../../models/piDetails");
const InvoiceDetail = require("../../models/invoiceDetails");



async function createUser(req, res) {
    try {
        const registerUser = new UserDetail({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            userImage: req.file.filename
        })
        const token = await registerUser.generateAuthToken();

        // console.log(token);
        res.cookie("sop", token, {
            expires: new Date(Date.now() + 72000000),
            httpOnly: true
        })

        const register = await registerUser.save();

        res.status(201).render("pages/director/createUserPage", { success: true });
    } catch (error) {
        res.status(401).send(error)
    }
};

async function itDetails(req, res) {
    try {

        let it = "IT-"
        it += format.asString('yy-MM-dd', new Date());
        let year = format('yy', new Date());;
        var count = await ItDetail.count({ year: year })
        if (count == 0) {
            count = 1;
        } else {
            count += 1
        }
        it += "-";
        count = count.toString();
        it += count;

        console.log(it);

        const itDetail = new ItDetail({
            itNumber: it,
            companyName: req.body.companyName,
            personName: req.body.person,
            contact: req.body.contact,
        })
        const itStatus = await itDetail.save();
        // console.log(itStatus);
        res.redirect('/user/itdata?success=' + true + "&itNo=" + it);


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


        let counter = parseInt(req.body.counter)
        let testData = []
        for (let i = 0; i < counter; i++) {
            let obj = {
                testType: req.body.testType[i],
                noOfSample: req.body.noOfSample[i]
            }
            testData.push(obj);
        }


        const trDetail = new TrDetail({
            trNumber: tr,
            piNumber: req.body.piNumber,
            companyName: req.body.companyName,
            testData: testData,
            receivedBy: req.body.receivedBy,
            contact: req.body.contact,
        })
        const trStatus = await trDetail.save();

        let data = await PiDetail.findOneAndUpdate({ piNumber: req.body.piNumber }, {
            statusOfTr: "Generated"
        })

        // console.log(trStatus);
        res.redirect('/user/trdata?success=' + true + "&trNo=" + tr);

    } catch (error) {
        res.status(401).send(error)
    }
};


async function setPiDetails(req, res) {
    try {

        let pi = "PI-"
        pi += format.asString('yy-MM-dd', new Date());
        let year = format('yy', new Date());;
        var count = await PiDetail.count({ year: year })
        if (count == 0) {
            count = 1;
        } else {
            count += 1
        }
        pi += "-";
        count = count.toString();
        pi += count;


        let counter = parseInt(req.body.counter)
        let testData = []
        let obj = {}
        if (counter == 1) {
            obj = {
                testType: req.body.testType,
                noOfSample: req.body.noOfSample,
                cost: req.body.cost
            }
            testData.push(obj);
        }
        else {
            for (let i = 0; i < counter; i++) {
                obj = {
                    testType: req.body.testType[i],
                    noOfSample: req.body.noOfSample[i],
                    cost: req.body.cost[i]
                }
                testData.push(obj);
            }
        }
        const piDetails = new PiDetail({
            piNumber: pi,
            itNumber: req.body.itNumber,
            companyName: req.body.companyName,
            contact: req.body.contact,
            poDo: req.body.poDoStatus,
            isPiAccepted: req.body.piStatus,
            testData: testData,
            totalCost: req.body.totalCost,
            advancePayment: req.body.advancePayment,
        })
        const piStatus = await piDetails.save();

        let data = await ItDetail.findOneAndUpdate({ itNumber: req.body.itNumber }, {
            statusOfPi: "Generated"
        })

        res.redirect('/user/pidata?success=' + true + "&piNo=" + pi);



    } catch (error) {
        res.status(400).send("Error occureed plz try again!!")
    }
};


async function piDetailsForAcceptance(req, res) {
    try {

        let pi = "PI-"
        pi += format.asString('yy-MM-dd', new Date());
        let year = format('yy', new Date());;
        var count = await PiDetail.count({ year: year })
        if (count == 0) {
            count = 1;
        } else {
            count += 1
        }
        pi += "-";
        count = count.toString();
        pi += count;


        let counter = parseInt(req.body.counter)
        let testData = []
        let obj = {}
        if (counter == 1) {
            obj = {
                testType: req.body.testType,
                noOfSample: req.body.noOfSample,
                cost: req.body.cost
            }
            testData.push(obj);
        }
        else {
            for (let i = 0; i < counter; i++) {
                obj = {
                    testType: req.body.testType[i],
                    noOfSample: req.body.noOfSample[i],
                    cost: req.body.cost[i]
                }
                testData.push(obj);
            }
        }
        // console.log(testData);
        const piDetail = new PiDetail({
            piNumber: pi,
            companyName: req.body.companyName,
            contact: req.body.contact,
            testData: testData,
            totalCost: req.body.totalCost,
            isPiAccepted: "No"
        })
        // console.log(piDetail);
        const piStatus = await piDetail.save();
        res.redirect('/user/pidata?success=' + true + "&piNo=" + pi);

    } catch (error) {
        res.status(400).send("Error occureed plz try again!!")
    }
};

async function updatePiDetails(req, res) {
    try {

        let counter = parseInt(req.body.counter)
        let testData = []

        let obj = {}
        if (counter == 1) {
            obj = {
                testType: req.body.testType,
                noOfSample: req.body.noOfSample,
                cost: req.body.cost
            }
            testData.push(obj);
        }
        else {
            for (let i = 0; i < counter; i++) {
                obj = {
                    testType: req.body.testType[i],
                    noOfSample: req.body.noOfSample[i],
                    cost: req.body.cost[i]
                }
                testData.push(obj);
            }
        }

        let data = await PiDetail.findOneAndUpdate({ piNumber: req.body.piNumber }, {
            testData: testData,
            advancePayment: req.body.advancePayment,
            poDo: req.body.poDoStatus,
            isPiAccepted: req.body.piStatus,
            totalCost: req.body.totalCost,
        })
        res.redirect("/user/getPiDataList?page=1&limit=7&success=" + true)
    } catch (error) {
        res.status(400).send("Error occureed plz try again!!")
    }
};


async function invoiceDetails(req, res) {
    try {
        let inNo = "INV-"
        inNo += format.asString('yy-MM-dd', new Date());
        let year = format('yy', new Date());;
        var count = await InvoiceDetail.count({ year: year })
        if (count == 0) {
            count = 1;
        } else {
            count += 1
        }
        inNo += "-";
        count = count.toString();
        inNo += count;

        let counter = parseInt(req.body.counter)
        let testData = []
        let obj = {}
        if (counter == 1) {
            obj = {
                testType: req.body.testType,
                noOfSample: req.body.noOfSample,
                cost: req.body.cost
            }
            testData.push(obj);
        }
        else {
            for (let i = 0; i < counter; i++) {
                obj = {
                    testType: req.body.testType[i],
                    noOfSample: req.body.noOfSample[i],
                    cost: req.body.cost[i]
                }
                testData.push(obj);
            }
        }
        
        const inDetail = new InvoiceDetail({
            invoiceNumber: inNo,
            trNumber: req.body.trNumber,
            companyName: req.body.companyName,
            contact: req.body.contact,
            testData: testData,
            totalCost: req.body.totalCost,
            advancePayment: req.body.advancePayment,
            paymentStatus: req.body.paymentStatus,
            advancePayment:req.body.advancePayment,
            reportfile:req.file.filename,
        })

        const inStatus = await inDetail.save();
        let data = await TrDetail.findOneAndUpdate({ trNumber: req.body.trNumber }, {
            isInvoiceGen: "Generated"
        })

        res.redirect('/user/invoicedata?success=' + true + "&inNo=" + inNo);


    } catch (error) {
        res.status(500).send(error)
    }
};

async function updateInvoiceDetails(req, res) {
    try {
        let data = await InvoiceDetail.findOneAndUpdate({ invoiceNumber: req.body.inNumber }, {
            advancePayment: req.body.advancePayment,
            totalCost: req.body.totalCost,
            paymentStatus:req.body.paymentStatus
        })
        res.redirect('/user/invoicedata?success=' + true + "&inNo=" + req.body.inNumber);


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


async function trDetailssRes(req, res) {
    try {
        res.status(201).render("pages/labhead/labheadRecords", { data: res.paginatedResult.results, next: res.paginatedResult.next, prev: res.paginatedResult.previous });
    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = {
    createUser: createUser,
    itDetails: itDetails,
    trDetails: trDetails,
    piDetails: setPiDetails,
    piDetailsForAcceptance: piDetailsForAcceptance,
    updatePiDetails: updatePiDetails,
    invoiceDetails: invoiceDetails,
    updateInvoiceDetails:updateInvoiceDetails,
    invoiceDetailsRes: invoiceDetailsRes,
    trDetailssRes: trDetailssRes,
    piDetailsRes: piDetailsRes,
}