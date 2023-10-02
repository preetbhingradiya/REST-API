const { Router } = require("express");
const { AddPost, updatePost, deletePost, Like, getPost } = require("../controllers/post-controller");

const PostRoute=Router()

PostRoute.post('/',AddPost)
PostRoute.patch('/update/:id',updatePost)
PostRoute.delete('/delete/:id',deletePost)
PostRoute.patch('/like/:id',Like)
PostRoute.get('/:id',getPost)
PostRoute.get('/timeline/all',getPost)

module.exports=PostRoute