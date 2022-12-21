const ItDetails = require("../../models/itDetails")
const UserDetail = require("../../models/userModel")

async function receptionPage(req, res) {
    try {

        data={}
        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage
        data.userImage=userImg

        res.status(201).render("pages/reception/reception", {data:data, homeActive: true });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function receptionToLabHead(req, res) {
    try {
        let it = req.query.itNo
        let data = await ItDetails.findOne({ itNumber: it })
        res.status(201).render("pages/reception/receptionToLabHead", { data: data, activeITtab: true });

    } catch (error) {
        res.status(401).send(error)
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

async function updateItStatus(req, res) {
    try {
        let it = req.query.itNo
        let data = await ItDetails.findOneAndUpdate({ itNumber: it }, {
            submittedToLabHead: "Yes"
        })
        console.log(data);
        res.status(201).render("pages/reception/receptionToLabHead", { data: data, success: true , activeITtab:true});

    } catch (error) {
        res.status(500).send(error)
    }
};



module.exports = {
    reception: receptionPage,
    receptionToLabHead: receptionToLabHead,
    itDetailsRes: itDetailsRes,
    submittedItDetailsRes:submittedItDetailsRes,
    updateItStatus: updateItStatus,
}
