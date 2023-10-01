const { Router } = require("express");
const {updateUser, deleteUser, OneUser} = require("../controllers/user-controller");

const userRoute=Router()

userRoute.patch('/update/:id',updateUser)
userRoute.delete('/delete/:id',deleteUser)
userRoute.get('/:id',OneUser)

module.exports=userRoute