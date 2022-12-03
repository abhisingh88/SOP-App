const TrDetail = require("../../models/trDetails")

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
async function labHeadDataMiddleware(req, res) {
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

module.exports={
    receptionDataMiddleware:receptionDataMiddleware,
    labHeadDataMiddleware:labHeadDataMiddleware,
}