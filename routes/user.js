const { Router } = require("express");
const getUser = require("../controllers/user-controller");

const userRoute=Router()

userRoute.get('/',getUser)

module.exports=userRoute