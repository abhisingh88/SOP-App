const express = require("express")
const hbs = require("hbs");
const router = new express.Router()
const multer = require("multer")
const CredManager = require("./login/login")
const Manager = require("./manager/manager")
const Details = require("./api/api")
const path = require('path')
const auth = require("../middleware/auth");

const UserDetail = require("../models/userModel");
const ItDetail = require("../models/itDetails");
const TrDetail = require("../models/trDetails");

const DataMiddleware = require("./datamiddleware/datamiddleware")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/userData')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + "-" + path.extname(file.originalname))
    }
})

const uploadUser = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

const trStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/trFiles')
    },
    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, "TR" + "-" + Date.now() + path.extname(file.originalname))
    }
})

const uploadTr = multer({
    storage: trStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(pdf|docx)$/)) {
            return cb(new Error('Please upload a pdf or docx'))
        }
        cb(undefined, true)
    }
})



router.get("/", async (req, res) => {
    try {
        // res.status(201).render("pages/getLoginPage");
        res.status(201).render("index");
    } catch (error) {
        res.status(401).send(error)
    }
});

// Login routes
router.get("/user/loginPage", CredManager.getLoginPage)
router.get("/user/logout", auth, CredManager.logoutUser)
router.post("/user/login", CredManager.loginUser)
router.get("/error", CredManager.errorPage)


// Data middle endpoint
router.get("/user/itdata", auth, DataMiddleware.receptionDataMiddleware)
router.get("/user/trdata", auth, DataMiddleware.TrlabHeadDataMiddleware)
router.get("/user/pidata", auth, DataMiddleware.PiFinancialDataMiddleware)
// router.get("/user/invoicedata", auth, DataMiddleware.labHeadDataMiddleware)


// data/files uploader
router.post("/data/itDetails", Details.itDetails)
router.post("/data/trDetails", Details.trDetails)
router.post("/data/piDetails", Details.piDetails)
router.post("/data/invoiceDetails", Details.invoiceDetails)


// Other endpoints
router.post("/user/createUser", uploadUser.single('profile_photo'), Details.createUser)
router.get("/user/updateItStatus", auth, Details.updateItStatus)


// paginated file details
router.get("/data/itDetailsCount", [auth, paginatedResult(ItDetail,{submittedToLabHead:"NO"},{ Reqdate: 'desc', itNumber: 'desc' })], Details.itDetailsRes)
router.get("/data/submittedItDetailsCount", [auth, paginatedResult(ItDetail,{submittedToLabHead:"Yes"},{Reqdate: 'desc', itNumber: 'desc' })], Details.submittedItDetailsRes)

// router.get("/data/trDetailsCount", [auth, paginatedResult(TrDetail)], Details.trDetailssRes)
// router.get("/data/piDetailsCount", [auth, paginatedResult(UserDetail)], Details.piDetailsRes)
// router.get("/data/invoiceDetailsCount", [auth, paginatedResult(UserDetail)], Details.invoiceDetailsRes)


// Director
router.get("/user/director", auth, Manager.director)
router.get("/user/finalInvoice", auth, Manager.getdirectorInovoiceRecords)
router.get("/user/createUserPage", auth, Manager.createUserPage)
router.get("/user/getApprovalReportPage", auth, Details.getApprovalReportPage)
router.post("/user/trApproval", auth, Details.trApprovalDirector)
router.post("/user/retestDirector", auth, Details.retestDirector)


// Reception
router.get("/user/reception", auth, Manager.reception)
router.get("/user/receptionToLabHead", auth, Manager.receptionToLabHead)


// Lab Head
router.get("/user/trlabheadRecords", auth, Manager.getlabheadTrRecords)
router.get("/user/pilabheadRecords", auth, Manager.getlabheadPiRecords)
router.get("/user/labheadAllocateToTester", auth, Manager.labheadAllocateToTesterPage)
router.get("/user/generateTrLabhead", auth, Manager.Trlabhead)
router.get("/user/completedTestReports", auth, Details.completedTestReports)
router.get("/user/verifyReport", auth, Details.getVerifyReportPage)
router.post("/user/sendToDiretor", auth, Details.sendToDiretor)
router.post("/user/retestToLabTester", auth, Details.retestToLabTester)


router.post("/user/labheadAllocateToTester", auth, Manager.labheadAllocateToTester)


// Lab Tester
router.get("/user/tester", auth, Manager.tester)
router.get("/user/testViewSubmission", auth, Manager.getTestViewSubmission)
router.get("/user/testViewSubmissionUpdate", auth, Manager.getTestViewSubmissionUpdate)
router.get("/user/reissuedTrDataToTester", auth, Manager.reissuedTrDataToTester)
router.post("/user/testViewSubmission", [auth, uploadTr.single('trfile'),], Manager.testViewSubmission)
router.post("/user/testViewSubmissionUpdate", [auth, uploadTr.single('trfile'),], Manager.testViewSubmissionUpdate)


// Financial
router.get("/user/generatePiFinancial", auth, Manager.PiFinancial)
router.get("/user/dataOfItLab", auth, Manager.dataFromreceptionToFinance)
router.get("/user/finance", auth, Manager.finance)

// Test-List Update API



// Function for paginated result
function paginatedResult(model, param1,param2) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        // const limit=2

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await model.find(param1).count()) {
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

        try {
            // results.results = await model.find().sort({itNumber: 'desc'}).limit(limit).skip(startIndex)
            results.results = await model.find(param1).sort(param2).limit(limit).skip(startIndex)
            // console.log(results);
            res.paginatedResult = results
            next()
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}



module.exports = router;
