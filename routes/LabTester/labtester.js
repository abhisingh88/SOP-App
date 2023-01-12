const TrDetail = require("../../models/trDetails")
const UserDetail = require("../../models/userModel")

async function testerPage(req, res) {
    try {
        let userId = req.cookies.userId
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await TrDetail.find({ allocatedTo: userId, suggestion: "null" }).count()) {
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

        let data = await TrDetail.find({ allocatedTo: userId, suggestion: "null" }).sort({ date: "desc", trNumber: "desc" }).limit(limit).skip(startIndex);
        data.userImage = userImg
        data.next=results.next
        data.prev=results.previous

        res.status(201).render("pages/tester/tester", { data: data, testReqTab: true });

    } catch (error) {
        res.status(401).send(error)
    }
};

async function reissuedTrDataToTester(req, res) {
    try {
        let userId = req.cookies.userId
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await TrDetail.find({ allocatedTo: userId, suggestion: "null" }).count()) {
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

        let data = await TrDetail.find({ allocatedTo: req.cookies.userId, suggestion: { $ne: "null" }, remark: "null" }).sort({ date: "desc", trNumber: "desc" }).limit(limit).skip(startIndex);
        data.userImage = userImg
        data.next=results.next
        data.prev=results.previous

        res.status(200).render("pages/tester/reissuedTR", { data: data, reissuedTestTab: true })

    } catch (error) {
        res.status(401).send(error)
    }
};


async function getTestViewSubmission(req, res) {
    try {
        let tr = req.query.trNo
        let userId = req.cookies.userId
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        let data = await TrDetail.findOne({ trNumber: tr })
        data.userImage = userImg
        res.status(200).render("pages/tester/testerReport", { data: data, testReqTab: true })
    } catch (error) {
        res.status(401).send(error)
    }
};


async function getTestViewSubmissionUpdate(req, res) {
    try {
        let tr = req.query.trNo

        let userId = req.cookies.userId
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        let data = await TrDetail.findOne({ trNumber: tr })
        data.userImage = userImg
        res.status(200).render("pages/tester/testerReportUpdate", { data: data, reissuedTestTab: true })

    } catch (error) {
        res.status(401).send(error)
    }
};


async function testViewSubmission(req, res) {
    try {
        let tr = req.body.trNo
        let userId = req.cookies.userId
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        let data = await TrDetail.findOneAndUpdate({ trNumber: tr }, {
            filename: req.file.filename,
            status: "Uploaded",
            commentFromTester: req.body.comment,
        })
        data.userImage = userImg

        res.status(200).render("pages/tester/testerReport", { success: true, data: data, testReqTab: true })

    } catch (error) {
        res.status(401).send(error)
    }
};

async function testViewSubmissionUpdate(req, res) {
    try {
        let tr = req.body.trNo
        let userId = req.cookies.userId
        userData = await UserDetail.findOne({ _id: userId })
        userImg = userData.userImage

        let data = await TrDetail.findOneAndUpdate({ trNumber: tr }, {
            filename: req.file.filename,
            status: "Uploaded",
            commentFromTester: req.body.comment,
            suggestion: "null",
            toDirector: "null",
        })
        data.userImage = userImg

        res.status(200).render("pages/tester/testerReport", { success: true, data: data, reissuedTestTab: true })

    } catch (error) {
        res.status(401).send(error)
    }
};

module.exports = {
    tester: testerPage,
    getTestViewSubmission: getTestViewSubmission,
    getTestViewSubmissionUpdate: getTestViewSubmissionUpdate,
    reissuedTrDataToTester: reissuedTrDataToTester,
    testViewSubmission: testViewSubmission,
    testViewSubmissionUpdate: testViewSubmissionUpdate,

}

