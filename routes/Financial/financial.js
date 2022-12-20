const UserDetail = require("../../models/userModel");
const ItDetails = require("../../models/itDetails");
const TrDetail = require("../../models/trDetails");
const PiDetail = require("../../models/piDetails");
const InvoiceDetail = require("../../models/invoiceDetails");

async function financePage(req, res) {
    try {

        res.status(201).render("pages/financial/finance");

    } catch (error) {
        res.status(401).send(error)
    }
};


async function dataFromreceptionToFinance(req, res) {
    try {

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        data=res.paginatedResult.results
        data.userImage = userImg

        res.status(201).render("pages/financial/itFromRec_LabHead", { data: data, next: res.paginatedResult.next, prev: res.paginatedResult.previous,ItReqTab:true });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function PiFinancial(req, res) {
    try {

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        it = req.query.itNo;
        let data = await ItDetails.findOne({ itNumber: it })

        data.userImage = userImg
        res.status(201).render("pages/financial/generatePr", { data: data , ItReqTab:true});

    } catch (error) {
        res.status(401).send(error)
    }
};

async function getPiForm(req, res) {
    try {

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        data={}
        data.userImage = userImg

        res.status(201).render("pages/financial/generatePiForm", {data:data,generatePiTab:true});
    } catch (error) {
        res.status(401).send(error)
    }
};



async function getInvoiceRecords(req, res) {
    try {

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        data=res.paginatedResult.results
        data.userImage = userImg

        res.status(201).render("pages/financial/invoiceRecordsFinancial", { data: data, next: res.paginatedResult.next, prev: res.paginatedResult.previous, invoiceListTab:true });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function getPiDataList(req, res) {
    try {

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        data=res.paginatedResult.results
        data.userImage = userImg

        res.status(201).render("pages/financial/piDataList", { data: data, next: res.paginatedResult.next, prev: res.paginatedResult.previous, GenPiListTab:true });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function updatePiDetails(req, res) {
    try {

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        pi = req.query.piNo;
        let data = await PiDetail.findOne({ piNumber: pi })

        data.counter=data.testData.length

        data.userImage = userImg

        res.status(201).render("pages/financial/updatePiPage", { data: data, GenPiListTab:true });

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
        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        data.userImage = userImg

        res.status(201).render("pages/financial/getOneInvoicePage", {data: data, invoiceListTab:true});

    } catch (error) {
        res.status(401).send(error)
    }
};

module.exports = {
    finance: financePage,
    dataFromreceptionToFinance: dataFromreceptionToFinance,
    PiFinancial: PiFinancial,
    getPiForm: getPiForm,
    getInvoiceRecords: getInvoiceRecords,
    getPiDataList:getPiDataList,
    updatePiDetails:updatePiDetails,
    generateInvoiceFinancial:generateInvoiceFinancial,

}   
