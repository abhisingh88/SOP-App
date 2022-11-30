

async function receptionDataMiddleware(req, res) {
    try {
        let success=req.query.success
        let it=req.query.itNo
        // console.log("reached");
        res.status(201).render("pages/reception/reception", { success: success, itNo:it });

    } catch (error) {
        res.status(401).send(error)
    }
};
async function labHeadDataMiddleware(req, res) {
    try {
        let success=req.query.success
        let it=req.query.itNo
        // console.log("reached");
        res.status(201).render("pages/labhead/labhead", { success: success, itNo:it });

    } catch (error) {
        res.status(401).send(error)
    }
};

module.exports={
    receptionDataMiddleware:receptionDataMiddleware,
    labHeadDataMiddleware:labHeadDataMiddleware,
}