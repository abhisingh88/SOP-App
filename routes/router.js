const express = require("express")
const hbs = require("hbs");
const router = new express.Router()
const CredManager = require("./login/login")
const Manager = require("./manager/manager")
const Details = require("./api/api")

const auth= require("../middleware/auth");

const UserDetail = require("../models/userModel");
const ItDetail = require("../models/itDetails");

router.get("/", async (req, res) => {
    try {
        // res.status(201).render("pages/getLoginPage");

        res.status(201).render("index");
    } catch (error) {
        res.status(401).send(error)
    }
});

// Login routes
// router.get("/user/signupPage", CredManager.getSignUpPage)
router.get("/user/loginPage", CredManager.getLoginPage)
router.get("/user/logout",auth, CredManager.logoutUser)
router.post("/user/login", CredManager.loginUser)
router.get("/error", CredManager.errorPage)


// Data middle endpoint
router.get("/user/data",auth, Manager.receptionDataMiddleware)


// data/files uploader
router.post("/data/itDetails", Details.itDetails)
router.post("/data/trDetails", Details.trDetails)
router.post("/data/piDetails", Details.piDetails)
router.post("/data/invoiceDetails", Details.invoiceDetails)
router.post("/user/createUser", Details.createUser)
router.get("/user/updateItStatus",auth, Details.updateItStatus)


// paginated file details
router.get("/data/itDetailsCount",[auth,paginatedResult(ItDetail)], Details.itDetailsRes)
// /data/itDetailsCount?page=1&limit=8 set this link in sidebar

router.get("/data/piDetailsCount",[auth,paginatedResult(UserDetail)], Details.piDetailsRes)
router.get("/data/trDetailsCount",[auth,paginatedResult(UserDetail)], Details.trDetailssRes)
router.get("/data/invoiceDetailsCount",[auth,paginatedResult(UserDetail)], Details.invoiceDetailsRes)


// Director
router.get("/user/director",auth, Manager.director)
router.get("/user/createUserPage",auth, Manager.createUserPage)


// Reception
router.get("/user/reception",auth, Manager.reception)
router.get("/user/receptionToLabHead",auth, Manager.receptionToLabHead)


// Lab Head
router.get("/user/labhead",auth, Manager.labhead)


// Lab Tester
router.get("/user/tester",auth, Manager.tester)


// Financial
router.get("/user/finance",auth, Manager.finance)

// Test-List Update API



// Function for paginated result
function paginatedResult(model){
    return async (req, res, next)=>{
        const page= parseInt(req.query.page)
        const limit= parseInt(req.query.limit)
        // const limit=2

        const startIndex = (page-1)*limit
        const endIndex= page*limit

        const results={}

        if(endIndex < await model.count()){
            results.next={
                page:page+1,
                limit:limit
            }
        }

        if(startIndex>0){
            results.previous={
                page:page-1,
                limit:limit
            }
        }

        try {
            // results.results = await model.find().sort({itNumber: 'desc'}).limit(limit).skip(startIndex)
            results.results = await model.find().sort({Reqdate: 'desc', itNumber:'desc'}).limit(limit).skip(startIndex)
            // console.log(results);
            res.paginatedResult = results
            next()
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = router;
