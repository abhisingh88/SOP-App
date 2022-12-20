const ItDetails = require("../../models/itDetails");
const TrDetail = require("../../models/trDetails");
const UserDetail = require("../../models/userModel");
const PiDetail = require("../../models/piDetails");
const InvoiceDetail = require("../../models/invoiceDetails");


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
    generateInvoiceFinancial:generateInvoiceFinancial,
}
