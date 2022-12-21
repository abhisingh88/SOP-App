const ItDetail = require("../../models/itDetails");
const TrDetail = require("../../models/trDetails");
const PiDetail = require("../../models/piDetails");
const InvoiceDetail = require("../../models/invoiceDetails");
const UserDetail = require("../../models/userModel");

async function getItDataStatus(req, res) {
    try {
        let itNo = req.query.itNo
        let data = await ItDetail.findOne({ itNumber: itNo })

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        res.status(201).render("pages/tracker/itDataStatus", { data: data, success: true , getOneItRecordTab:true});

    } catch (error) {
        res.status(500).send(error)
    }
};
async function getPiDataStatus(req, res) {
    try {
        let piNo = req.query.piNo
        let data = await PiDetail.findOne({ piNumber: piNo })
        
        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage
        
        res.status(201).render("pages/tracker/piDataStatus", { data: data, success: true , getOnePiRecordTab:true});

    } catch (error) {
        res.status(500).send(error)
    }
};
async function getTrDataStatus(req, res) {
    try {
        let trNo = req.query.trNo
        let data = await TrDetail.findOne({ trNumber: trNo })

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        res.status(201).render("pages/tracker/trDataStatus", { data: data, success: true , getOneTrRecordTab:true});

    } catch (error) {
        res.status(500).send(error)
    }
};

async function getInvoiceDataStatus(req, res) {
    try {
        let inNo = req.query.inNo
        let data = await InvoiceDetail.findOne({ invoiceNumber: inNo })

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        res.status(201).render("pages/tracker/inDataStatus", { data: data, success: true , getOneInRecordTab:true});
        
    } catch (error) {
        res.status(500).send(error)
    }
};

async function getDirectorTrDataStatus(req, res) {
    try {
        let trNo = req.query.trNo
        let data = await TrDetail.findOne({ trNumber: trNo })

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        res.status(201).render("pages/tracker/directorTrDataStatus", { data: data, success: true , getOneTrRecordTab:true});

    } catch (error) {
        res.status(500).send(error)
    }
};

async function getDirectorInvoiceDataStatus(req, res) {
    try {
        let inNo = req.query.inNo
        let data = await InvoiceDetail.findOne({ invoiceNumber: inNo })

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        res.status(201).render("pages/tracker/directorInDataStatus", { data: data, success: true , getOneInRecordTab:true});

    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = {
    getItDataStatus:getItDataStatus,
    getPiDataStatus:getPiDataStatus,
    getTrDataStatus:getTrDataStatus,
    getInvoiceDataStatus:getInvoiceDataStatus,
    getDirectorTrDataStatus:getDirectorTrDataStatus,
    getDirectorInvoiceDataStatus:getDirectorInvoiceDataStatus,
}