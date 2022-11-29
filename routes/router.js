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


// Render Page for diff users
router.get("/user/director",auth, Manager.director)
router.get("/user/labhead",auth, Manager.labhead)
router.get("/user/reception",auth, Manager.reception)
router.get("/user/finance",auth, Manager.finance)
router.get("/user/tester",auth, Manager.tester)
router.get("/user/createUserPage",auth, Manager.createUserPage)

// Data middle endpoint
router.get("/user/data",auth, Manager.receptionDataMiddleware)

// data/files uploader
router.post("/data/itDetails", Details.itDetails)
router.post("/data/trDetails", Details.trDetails)
router.post("/data/piDetails", Details.piDetails)
router.post("/data/invoiceDetails", Details.invoiceDetails)
router.post("/user/createUser", Details.createUser)

// paginated file details
router.get("/data/itDetailsCount",[auth,paginatedResult(ItDetail)], Details.itDetailsRes)
router.get("/data/piDetailsCount",[auth,paginatedResult(UserDetail)], Details.piDetailsRes)
router.get("/data/trDetailsCount",[auth,paginatedResult(UserDetail)], Details.trDetailssRes)
router.get("/data/invoiceDetailsCount",[auth,paginatedResult(UserDetail)], Details.invoiceDetailsRes)


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
        // console.log("done");
        // results.results = model.slice(startIndex, endIndex)
        try {
            results.results = await model.find().sort({itNumber: 'desc'}).limit(limit).skip(startIndex)
            // results.results = model.find().sort({Reqdate: 'desc'}).slice(startIndex, endIndex)
            console.log(results);
            res.paginatedResult = results
            // console.log(results);
            next()
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = router;
