const TrDetail = require("../../models/trDetails")
const UserDetail = require("../../models/userModel")

async function testerPage(req, res) {
    try {
        let userId=req.cookies.userId
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        let data=await TrDetail.find({allocatedTo:userId,suggestion:"null"})
        data.userImage=userImg
        res.status(201).render("pages/tester/tester",{data:data, testReqTab:true});

    } catch (error) {
        res.status(401).send(error)
    }
};


async function getTestViewSubmission(req, res) {
    try {        
        let tr=req.query.trNo
        let userId=req.cookies.userId
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        let data = await TrDetail.findOne({ trNumber: tr })
        data.userImage=userImg
        res.status(200).render("pages/tester/testerReport",{data:data, testReqTab:true})
    } catch (error) {
        res.status(401).send(error)
    }
};


async function getTestViewSubmissionUpdate(req, res) {
    try {        
        let tr=req.query.trNo

        let userId=req.cookies.userId
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        let data = await TrDetail.findOne({ trNumber: tr })
        data.userImage=userImg
        res.status(200).render("pages/tester/testerReportUpdate",{data:data, reissuedTestTab:true})

    } catch (error) {
        res.status(401).send(error)
    }
};


async function reissuedTrDataToTester(req, res) {
    try {        
        let userId=req.cookies.userId
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        let data = await TrDetail.find({ allocatedTo:req.cookies.userId,suggestion:{$ne:"null"},remark:"null" })
        data.userImage=userImg

        res.status(200).render("pages/tester/reissuedTR",{data:data, reissuedTestTab:true})

    } catch (error) {
        res.status(401).send(error)
    }
};

async function testViewSubmission(req, res) {
    try {        
        let tr=req.body.trNo
        let userId=req.cookies.userId
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        let data = await TrDetail.findOneAndUpdate({ trNumber:tr }, {
            filename:req.file.filename,
            status:"Uploaded",
            commentFromTester:req.body.comment,
        })
        data.userImage=userImg

        res.status(200).render("pages/tester/testerReport",{success:true, data:data, testReqTab:true})
        
    } catch (error) {
        res.status(401).send(error)
    }
};

async function testViewSubmissionUpdate(req, res) {
    try {        
        let tr=req.body.trNo
        let userId=req.cookies.userId
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        let data = await TrDetail.findOneAndUpdate({ trNumber:tr }, {
            filename:req.file.filename,
            status:"Uploaded",
            commentFromTester:req.body.comment,
            suggestion:"null",
            toDirector:"null",
        })
        data.userImage=userImg

        res.status(200).render("pages/tester/testerReport",{success:true, data:data, reissuedTestTab:true})
        
    } catch (error) {
        res.status(401).send(error)
    }
};

module.exports = {
    tester: testerPage,
    getTestViewSubmission:getTestViewSubmission,
    getTestViewSubmissionUpdate:getTestViewSubmissionUpdate,
    reissuedTrDataToTester:reissuedTrDataToTester,
    testViewSubmission:testViewSubmission,
    testViewSubmissionUpdate:testViewSubmissionUpdate,

}

