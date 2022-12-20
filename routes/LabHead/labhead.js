
const TrDetail= require("../../models/trDetails")
const UserDetail=require("../../models/userModel")
const PiDetail = require("../../models/piDetails")
async function getlabheadTrRecords(req, res) {

    try {
        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        data=res.paginatedResult.results
        data.userImage = userImg

        res.status(201).render("pages/labhead/labheadRecords", { data: data, next: res.paginatedResult.next, prev: res.paginatedResult.previous });
    } catch (error) {
        res.status(401).send(error)
    }
};


async function getlabheadPiRecords(req, res) {
    try {
        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        data=res.paginatedResult.results
        data.userImage = userImg

        res.status(201).render("pages/labhead/prRecordsList", { data:data, next: res.paginatedResult.next, prev: res.paginatedResult.previous });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function approvedTestReportList(req, res) {
    try {
        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        data=res.paginatedResult.results
        data.userImage = userImg

        res.status(201).render("pages/labhead/approvedTrList", { data:data, next: res.paginatedResult.next, prev: res.paginatedResult.previous });

    } catch (error) {
        res.status(401).send(error)
    }
};


async function labheadAllocateToTesterPage(req, res) {
    try {
        userId=req.cookies.userId;
        userData=await UserDetail.findOne({_id:userId})
        userImg=userData.userImage
        
        let tr = req.query.trNo
        let data = await TrDetail.findOne({trNumber:tr})
        let testerData = await UserDetail.find({role:"Tester"})

        data.userImage=userImg

        res.status(201).render("pages/labhead/labheadTesterAllocate", { data: data, tester:testerData });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function TrlabheadPage(req, res) {
    try {

        userId=req.cookies.userId;
        userData=await UserDetail.findOne({_id:userId})
        userImg=userData.userImage

        pi = req.query.piNo;
        let data = await PiDetail.findOne({ piNumber: pi })
        data.userImage=userImg
        data.counter=data.testData.length

        res.status(201).render("pages/labhead/labhead", { data: data });

    } catch (error) {
        res.status(401).send(error)
    }
};


async function completedTestReports(req, res) {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await TrDetail.find({status:"Uploaded",toDirector:"null"}).count()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        let data = await TrDetail.find({status:"Uploaded", $and:[{toDirector:"null"},{suggestion:"null"}]}).sort({trNumber:"desc"}).limit(limit).skip(startIndex)

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage
        data.userImage=userImg

        res.status(201).render("pages/labhead/submittedTestReport", { data: data, next: results.next, prev: results.previous });
    } catch (error) {
        res.status(500).send(error)
    }
};


async function getVerifyReportPage(req, res) {
    try {
        let tr= req.query.trNo
        let data= await TrDetail.findOne({trNumber:tr})

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage
        data.userImage=userImg

        res.status(201).render("pages/labhead/labheadVerifyReport", {data:data});
    } catch (error) {
        res.status(500).send(error)
    }
};

async function sendToDiretor(req, res) {
    try {
        let tr= req.body.trNo
        let data= await TrDetail.findOneAndUpdate({trNumber:tr},{
            toDirector:"Yes"
        })
        res.redirect("/user/completedTestReports?page=1&limit=7")
    } catch (error) {
        res.status(500).send(error)
    }
};

async function retestToLabTester(req, res) {
    try {
        let tr= req.body.trNo
        let data= await TrDetail.findOneAndUpdate({trNumber:tr},{
            suggestion:req.body.suggestion,
            remark:"null",
        })
        // console.log(data);
        res.redirect("/user/completedTestReports?page=1&limit=7")
    } catch (error) {
        res.status(500).send(error)
    }
};


async function labheadAllocateToTester(req, res) {
    try {        
        let tr=req.body.trNo
        let tempUserData= await UserDetail.findOne({_id:req.body.testerId})
        let testerName=tempUserData.username
        let data = await TrDetail.findOneAndUpdate({ trNumber: tr }, {
            allocatedTo:req.body.testerId,
            testerName:testerName,
        })

        userId = req.cookies.userId;
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage
        data.userImage=userImg

        res.status(200).render("pages/labhead/labheadTesterAllocate",{success:true, data:data})

    } catch (error) {
        res.status(401).send(error)
    }
};

module.exports = {
    getlabheadTrRecords: getlabheadTrRecords,
    getlabheadPiRecords: getlabheadPiRecords,
    labheadAllocateToTesterPage:labheadAllocateToTesterPage,
    Trlabhead: TrlabheadPage,
    completedTestReports:completedTestReports,
    getVerifyReportPage:getVerifyReportPage,
    sendToDiretor:sendToDiretor,
    retestToLabTester:retestToLabTester,
    labheadAllocateToTester:labheadAllocateToTester,
    approvedTestReportList:approvedTestReportList,
}