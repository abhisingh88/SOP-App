const ItDetails = require("../../models/itDetails");
const TrDetail = require("../../models/trDetails");
const UserDetail = require("../../models/userModel");
const PiDetail = require("../../models/piDetails");
const InvoiceDetail = require("../../models/invoiceDetails");

async function directorPage(req, res) {
    try {

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        data=res.paginatedResult.results
        data.userImage = userImg


        res.status(201).render("pages/director/director", { data: data, next: res.paginatedResult.next, prev: res.paginatedResult.previous,testReportTab:true });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function getdirectorInovoiceRecords(req, res) {
    try {

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        data=res.paginatedResult.results
        data.userImage = userImg


        res.status(201).render("pages/director/directorFinalAuthorize", { data: data, next: res.paginatedResult.next, prev: res.paginatedResult.previous, ApproveInvoiceTab:true });

    } catch (error) {
        res.status(401).send(error)
    }
};


async function getfinalInvoices(req, res) {
    try {

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        data=res.paginatedResult.results
        data.userImage = userImg


        res.status(201).render("pages/director/finalInvoiceReportList", { data: data, next: res.paginatedResult.next, prev: res.paginatedResult.previous, invoiceListTab:true });

    } catch (error) {
        res.status(500).send(error)
    }
};

async function getApprovalReportPage(req, res) {
    try {
        let tr= req.query.trNo
        let data= await TrDetail.findOne({trNumber:tr})
        res.status(201).render("pages/director/approve_retest", {data:data, testReportTab:true});
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

async function finalApproval(req, res) {
    try {
        let inNo = req.query.inNo
        let data = await InvoiceDetail.findOneAndUpdate({ invoiceNumber: inNo }, {
            isAuthorized: "Yes"
        })
        res.status(201).render("pages/director/directorFinalAuthorize", {success: true , invoiceListTab:true});

    } catch (error) {
        res.status(500).send(error)
    }
};

async function retestDirector(req, res) {
    try {
        let tr= req.body.trNo
        let data= await TrDetail.findOneAndUpdate({trNumber:tr},{
            remark:req.body.remark,
            suggestion:"null",
            toDirector:"null",
        })
        // console.log(data);
        res.redirect("/user/director?page=1&limit=7")
    } catch (error) {
        res.status(500).send(error)
    }
};

async function createUser(req, res) {
    try {

        data={}

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage
        data.userImage = userImg


        res.status(201).render("pages/director/createUserPage", {data:data, createUserTab:true});

    } catch (error) {
        res.status(401).send(error)
    }
};

async function getApprovedTestList(req, res) {
    try {
        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        data=res.paginatedResult.results
        data.userImage = userImg

        res.status(201).render("pages/director/approvedTrList", { data:data, next: res.paginatedResult.next, prev: res.paginatedResult.previous, ApproveTestTab:true });

    } catch (error) {
        res.status(401).send(error)
    }
};



module.exports = {
    director: directorPage,
    getdirectorInovoiceRecords: getdirectorInovoiceRecords,
    getfinalInvoices: getfinalInvoices,
    getApprovalReportPage:getApprovalReportPage,
    trApprovalDirector:trApprovalDirector,
    finalApproval:finalApproval,
    retestDirector:retestDirector,
    createUserPage: createUser,
    getApprovedTestList:getApprovedTestList,

}
