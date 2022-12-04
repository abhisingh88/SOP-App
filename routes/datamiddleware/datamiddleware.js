const TrDetail = require("../../models/trDetails")
const PiDetail = require("../../models/piDetails")
const InvoiceDetails = require("../../models/invoiceDetails")

async function receptionDataMiddleware(req, res) {
    try {
        let success=req.query.success
        let it=req.query.itNo
        // console.log("reached");
        res.status(201).render("pages/reception/reception", { success: success, itNo:it, homeActive:true });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function TrlabHeadDataMiddleware(req, res) {
    try {
        let success=req.query.success
        let tr=req.query.trNo

        let data= await TrDetail.findOne({trNumber:tr})
        // console.log("reached");
        console.log(data);
        res.status(201).render("pages/labhead/successTrPage", { success: success,tr:tr, data:data });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function PiFinancialDataMiddleware(req, res) {
    try {
        let success=req.query.success
        let pi=req.query.piNo

        let data= await PiDetail.findOne({piNumber:pi})
        // console.log("reached");
        // console.log(data);
        res.status(201).render("pages/financial/successPiPage", { success: success,pi:pi, data:data });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function InFinacialDataMiddleware(req, res) {
    try {
        let success=req.query.success
        let inNo=req.query.inNo

        let data= await InvoiceDetails.findOne({invoiceNumber:inNo})
        // console.log("reached");
        // console.log(data);
        res.status(201).render("pages/financial/successInvoice", { success: success,inNo:inNo, data:data });

    } catch (error) {
        res.status(401).send(error)
    }
};
module.exports={
    receptionDataMiddleware:receptionDataMiddleware,
    TrlabHeadDataMiddleware:TrlabHeadDataMiddleware,
    PiFinancialDataMiddleware:PiFinancialDataMiddleware,
    InFinacialDataMiddleware:InFinacialDataMiddleware,
}