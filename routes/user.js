const { Router } = require("express");
const {updateUser, deleteUser, OneUser, followUser, UnFollowUser} = require("../controllers/user-controller");

const userRoute=Router()

userRoute.patch('/update/:id',updateUser)
userRoute.delete('/delete/:id',deleteUser)
userRoute.get('/:id',OneUser)
userRoute.patch('/followe/:id',followUser)
userRoute.patch('/unfollowe/:id',UnFollowUser)

module.exports=userRoute