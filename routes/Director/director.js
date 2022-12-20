const ItDetails = require("../../models/itDetails");
const TrDetail = require("../../models/trDetails");
const UserDetail = require("../../models/userModel");
const PiDetail = require("../../models/piDetails");
const InvoiceDetail = require("../../models/invoiceDetails");

async function directorPage(req, res) {
    try {
        res.status(201).render("pages/director/director", { data: res.paginatedResult.results, next: res.paginatedResult.next, prev: res.paginatedResult.previous });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function getdirectorInovoiceRecords(req, res) {
    try {
        res.status(201).render("pages/director/directorFinalAuthorize", { data: res.paginatedResult.results, next: res.paginatedResult.next, prev: res.paginatedResult.previous });

    } catch (error) {
        res.status(401).send(error)
    }
};


async function getfinalInvoices(req, res) {
    try {
        res.status(201).render("pages/director/finalInvoiceReportList", { data: res.paginatedResult.results, next: res.paginatedResult.next, prev: res.paginatedResult.previous });

    } catch (error) {
        res.status(500).send(error)
    }
};

async function getApprovalReportPage(req, res) {
    try {
        let tr= req.query.trNo
        let data= await TrDetail.findOne({trNumber:tr})
        res.status(201).render("pages/director/approve_retest", {data:data});
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
        let data = await InvoiceDetails.findOneAndUpdate({ invoiceNumber: inNo }, {
            isAuthorized: "Yes"
        })
        res.status(201).render("pages/director/directorFinalAuthorize", { success: true , activeITtab:true});

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
        console.log(data);
        res.redirect("/user/director?page=1&limit=7")
    } catch (error) {
        res.status(500).send(error)
    }
};

async function createUser(req, res) {
    try {
        res.status(201).render("pages/director/createUserPage");

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

}