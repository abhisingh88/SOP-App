const express = require("express")
const hbs = require("hbs");
const router = new express.Router()
const Cred = require("./login/login")
const Manager = require("./manager/manager")
const Details = require("./api/api")

const auth= require("../middleware/auth")

router.get("/", async (req, res) => {
    try {
        res.status(201).render("index");
    } catch (error) {
        res.status(401).send(error)
    }
});

// Login
// router.get("/user/signupPage", Cred.getSignUpPage)
router.get("/user/loginPage", Cred.getLoginPage)
router.post("/user/login", Cred.loginUser)
router.post("/user/logout", Cred.logoutUser)


// Render Page for diff users
router.get("/user/director", Manager.director)
router.get("/user/labhead", Manager.labhead)
router.get("/user/reception", Manager.reception)
router.get("/user/finance", Manager.finance)
router.get("/user/tester", Manager.tester)


// files
router.post("/data/itDetails", Details.itDetails)
router.post("/data/trDetails", Details.trDetails)
router.post("/data/piDetails", Details.piDetails)
router.post("/data/invoiceDetails", Details.invoiceDetails)
router.post("/user/createUser", Details.createUser)


// Test List Update API


module.exports = router;