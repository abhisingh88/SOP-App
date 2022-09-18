const express = require("express")
const hbs = require("hbs");
const router = new express.Router()
const Cred = require("./login/login")
const Manager = require("./manager/manager")
const Details = require("./api/api")

const auth= require("../middleware/auth");
const UserDetail = require("../models/userModel");

router.get("/", async (req, res) => {
    try {
        res.status(201).render("index");
    } catch (error) {
        res.status(401).send(error)
    }
});

// Login routes
// router.get("/user/signupPage", Cred.getSignUpPage)
router.get("/user/loginPage", Cred.getLoginPage)
router.get("/user/logout",auth, Cred.logoutUser)
router.post("/user/login", Cred.loginUser)


// Render Page for diff users
router.get("/user/director",auth, Manager.director)
router.get("/user/labhead",auth, Manager.labhead)
router.get("/user/reception",auth, Manager.reception)
router.get("/user/finance",auth, Manager.finance)
router.get("/user/tester",auth, Manager.tester)
router.get("/user/createUserPage",auth, Manager.createUserPage)


// data/files uploader
router.post("/data/itDetails", Details.itDetails)
router.post("/data/trDetails", Details.trDetails)
router.post("/data/piDetails", Details.piDetails)
router.post("/data/invoiceDetails", Details.invoiceDetails)
router.post("/user/createUser", Details.createUser)

// paginated file details
router.get("/data/itDetailsCount",paginatedResult(UserDetail), Details.itDetailsRes)
router.get("/data/piDetailsCount",paginatedResult(UserDetail), Details.piDetailsRes)
router.get("/data/trDetailsCount",paginatedResult(UserDetail), Details.trDetailssRes)
router.get("/data/invoiceDetailsCount",paginatedResult(UserDetail), Details.invoiceDetailsRes)

// Test-List Update API



// Function for paginated result
function paginatedResult(model){
    return async (req, res, next)=>{
        const page= parseInt(req.query.page)
        const limit= parseInt(req.query.limit)

        const startIndex = (page-1)*limit
        const endIndex= page*limit

        const results={}

        if(endIndex < await model.countDocuments().exec()){
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

        // results.results = model.slice(startIndex, endIndex)
        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec()
            res.paginatedResult = results
            next()
        } catch (error) {
            res.status(500).json({message:e.message})
        }
    }
}

module.exports = router;