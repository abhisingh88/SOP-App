const TrDetail = require("../../models/trDetails")

async function testerPage(req, res) {
    try {
        let userId=req.cookies.userId
        let data=await TrDetail.find({allocatedTo:userId,suggestion:"null"})
        res.status(201).render("pages/tester/tester",{data:data});

    } catch (error) {
        res.status(401).send(error)
    }
};


async function getTestViewSubmission(req, res) {
    try {        
        let tr=req.query.trNo
        let data = await TrDetail.findOne({ trNumber: tr })
        res.status(200).render("pages/tester/testerReport",{data:data})

    } catch (error) {
        res.status(401).send(error)
    }
};


async function getTestViewSubmissionUpdate(req, res) {
    try {        
        let tr=req.query.trNo
        let data = await TrDetail.findOne({ trNumber: tr })
        res.status(200).render("pages/tester/testerReportUpdate",{data:data})

    } catch (error) {
        res.status(401).send(error)
    }
};


async function reissuedTrDataToTester(req, res) {
    try {        

        let data = await TrDetail.find({ allocatedTo:req.cookies.userId,suggestion:{$ne:"null"},remark:"null" })
        res.status(200).render("pages/tester/reissuedTR",{data:data})

    } catch (error) {
        res.status(401).send(error)
    }
};

async function testViewSubmission(req, res) {
    try {        
        let tr=req.body.trNo
    
        let data = await TrDetail.findOneAndUpdate({ trNumber:tr }, {
            filename:req.file.filename,
            status:"Uploaded",
            commentFromTester:req.body.comment,
        })
        res.status(200).render("pages/tester/testerReport",{success:true, data:data})
        
    } catch (error) {
        res.status(401).send(error)
    }
};

async function testViewSubmissionUpdate(req, res) {
    try {        
        let tr=req.body.trNo
        
        let data = await TrDetail.findOneAndUpdate({ trNumber:tr }, {
            filename:req.file.filename,
            status:"Uploaded",
            commentFromTester:req.body.comment,
            suggestion:"null",
            toDirector:"null",
        })
        // console.log(data);
        res.status(200).render("pages/tester/testerReport",{success:true, data:data})
        
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

