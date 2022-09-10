const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const auth = async (req, res, next) => {
    try {

        const token = req.cookies.jwt
        const verifyUser = jwt.verify(token, "secreat key")
        // console.log(verifyUser)
        const user = await User.findOne({ _id: verifyUser._id })
        // console.log(user);
        req.user = user
        req.token = token
        next()

    } catch (error) {
        res.redirect("/user/loginPage")
    }
}

module.exports = auth;