const express = require("express")
const userRouter = express.Router()
const isLoggedIn = require("../middlewares/isloggedin")

const {signincontroller,signupcontroller,userfetcher} = require("../controllers/user.js")
userRouter
    .post("/signin",signincontroller)
    .post("/signup",signupcontroller)
    .get("/fetch",isLoggedIn,userfetcher)
module.exports = userRouter    