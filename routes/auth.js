const { Router } = require("express");
const {registerUser, loginUser} = require("../controllers/auth-controller");

const authUserRoute=Router()

authUserRoute.post('/register',registerUser)
authUserRoute.post('/login',loginUser)

module.exports=authUserRoute