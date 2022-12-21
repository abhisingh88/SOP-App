const express = require("express")
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
const PiDetail = require("../models/piDetails");
const InvoiceDetail = require("../models/invoiceDetails");

const DataMiddleware = require("./datamiddleware/datamiddleware")


const Reception = require("./Reception/reception")
const Director = require("./Director/director")
const LabHead = require("./LabHead/labhead")
const LabTester = require("./LabTester/labtester")
const Financial = require("./Financial/financial")

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

const testReportStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/testReportFiles')
    },
    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, "TR" + "-" + Date.now() + path.extname(file.originalname))
    }
})

const uploadTr = multer({
    storage: testReportStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(pdf|docx)$/)) {
            return cb(new Error('Please upload a pdf or docx'))
        }
        cb(undefined, true)
    }
})

const testReqFormStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/testReqFiles')
    },
    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, "TRF" + "-" + Date.now() + path.extname(file.originalname))
    }
})

const uploadTestReqForm = multer({
    storage: testReqFormStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(pdf|docx)$/)) {
            return cb(new Error('Please upload a pdf or docx'))
        }
        cb(undefined, true)
    }
})

const invoiceFormStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/invoiceFiles')
    },
    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, "INV" + "-" + Date.now() + path.extname(file.originalname))
    }
})

const uploadInvoiceForm = multer({
    storage: invoiceFormStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(pdf|docx)$/)) {
            return cb(new Error('Please upload a pdf or docx'))
        }
        cb(undefined, true)
    }
})



router.get("/", async (req, res) => {
    try {
        res.status(201).render("index");
        // res.status(201).render("pages/getLoginPage");
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
router.get("/user/invoicedata", auth, DataMiddleware.InFinacialDataMiddleware)


// data/files uploader
router.post("/data/itDetails", Details.itDetails)
router.post("/data/trDetails", Details.trDetails)
router.post("/data/invoiceDetails",[auth, uploadInvoiceForm.single('invoicefile'),], Details.invoiceDetails)
router.post("/data/piDetails", Details.piDetails)
router.post("/data/piDetailsForAcceptance", Details.piDetailsForAcceptance)
router.post("/data/updatePiDetails", Details.updatePiDetails)
router.post("/data/updateInvoiceDetails", Details.updateInvoiceDetails)



// Director
//Paginated Result
router.get("/user/director", [auth, paginatedResult(TrDetail, { toDirector: "Yes", isAuthorized: "null", suggestion: "null" }, { trNumber: "desc" })], Director.director)
router.get("/user/finalInvoice", [auth, paginatedResult(InvoiceDetail, { isAuthorized: "null", paymentStatus: "Completed" }, { trNumber: "desc" })], Director.getdirectorInovoiceRecords)
router.get("/user/getfinalInvoice", [auth, paginatedResult(InvoiceDetail, { isAuthorized: "Yes", paymentStatus: "Completed" }, { invoiceNumber: "desc" })], Director.getfinalInvoices)
router.get("/user/getApprovedTestList", [auth, paginatedResult(TrDetail, {isAuthorized:"Yes"}, { date: "desc", trNumber: "desc" })], Director.getApprovedTestList)

router.get("/user/getApprovalReportPage", auth, Director.getApprovalReportPage)
router.post("/user/trApproval", auth, Director.trApprovalDirector)
router.get("/user/finalApprovalPage", auth, Director.finalApproval)
router.post("/user/retestDirector", auth, Director.retestDirector)
router.get("/user/createUserPage", auth, Director.createUserPage)
// Other endpoints
router.post("/user/createUser", uploadUser.single('profile_photo'), Details.createUser)




// Reception
router.get("/user/reception", auth, Reception.reception)
router.get("/user/receptionToLabHead", auth, Reception.receptionToLabHead)
router.get("/user/updateItStatus", auth, Reception.updateItStatus)

// Reception paginated file details
router.get("/data/itDetailsCount", [auth, paginatedResult(ItDetail, { submittedToLabHead: "NO" }, { Reqdate: 'desc', itNumber: 'desc' })], Reception.itDetailsRes)
router.get("/data/submittedItDetailsCount", [auth, paginatedResult(ItDetail, { submittedToLabHead: "Yes" }, { Reqdate: 'desc', itNumber: 'desc' })], Reception.submittedItDetailsRes)


// Lab Head
//LabHead Paginated Result
router.get("/user/pilabheadRecords", [auth, paginatedResult(PiDetail, {isPiAccepted:"Yes"}, {date: "desc", piNumber: "desc" })], LabHead.getlabheadPiRecords)
router.get("/user/trlabheadRecords", [auth, paginatedResult(TrDetail, {}, { date: "desc", trNumber: "desc" })], LabHead.getlabheadTrRecords)
router.get("/user/approvedTestReportList", [auth, paginatedResult(TrDetail, {isAuthorized:"Yes"}, { date: "desc", trNumber: "desc" })], LabHead.approvedTestReportList)
router.get("/user/completedTestReports", auth, LabHead.completedTestReports)

router.get("/user/labheadAllocateToTester", auth, LabHead.labheadAllocateToTesterPage)
router.get("/user/generateTrLabhead", auth, LabHead.Trlabhead)
router.get("/user/verifyReport", auth, LabHead.getVerifyReportPage)
router.post("/user/sendToDiretor", auth, LabHead.sendToDiretor)
router.post("/user/retestToLabTester", auth, LabHead.retestToLabTester)
router.post("/user/labheadAllocateToTester", auth, LabHead.labheadAllocateToTester)



// Lab Tester
router.get("/user/tester", auth, LabTester.tester)
router.get("/user/reissuedTrDataToTester", auth, LabTester.reissuedTrDataToTester)
router.get("/user/testViewSubmission", auth, LabTester.getTestViewSubmission)
router.get("/user/testViewSubmissionUpdate", auth, LabTester.getTestViewSubmissionUpdate)
router.post("/user/testViewSubmission", [auth, uploadTr.single('trfile'),], LabTester.testViewSubmission)
router.post("/user/testViewSubmissionUpdate", [auth, uploadTr.single('trfile'),], LabTester.testViewSubmissionUpdate)


// Financial
// router.get("/user/finance", auth, Financial.finance)
// Paginated Result
router.get("/user/dataOfItLab", [auth, paginatedResult(ItDetail, { submittedToLabHead: "Yes", statusOfPi: "Not Generated" }, { Reqdate: "desc", itNumber: "desc" })], Financial.dataFromreceptionToFinance)
router.get("/user/getInvoiceRecords", [auth, paginatedResult(TrDetail, { isAuthorized: "Yes", isInvoiceGen: "null" }, { trNumber: "desc" })], Financial.getInvoiceRecords)
router.get("/user/getPiDataList", [auth, paginatedResult(PiDetail, {}, { date:"desc",piNumber: "desc" })], Financial.getPiDataList)
router.get("/user/getApprovedFinalInvoiceList", [auth, paginatedResult(InvoiceDetail, { isAuthorized: "Yes", paymentStatus: "Completed" }, { invoiceNumber: "desc" })], Financial.getApprovedFinalInvoiceList)
router.get("/user/getPendingInvoiceList", [auth, paginatedResult(InvoiceDetail, { isAuthorized: "null", paymentStatus: "notCompleted" }, { invoiceNumber: "desc" })], Financial.getPendingInvoiceList)


router.get("/user/PiFinancialDataOfIt", auth, Financial.PiFinancial)
router.get("/user/updatePendingInvoice", auth, Financial.updatePendingInvoice)
router.get("/user/generatePiForm", auth, Financial.getPiForm)
router.get("/user/updatePiDetails", auth, Financial.updatePiDetails)
router.get("/user/generateInvoiceFinancial", auth, Financial.generateInvoiceFinancial)


// Function for paginated result
function paginatedResult(model, param1, param2) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

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
            results.results = await model.find(param1).sort(param2).limit(limit).skip(startIndex)
            res.paginatedResult = results
            next()
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}



module.exports = router;
