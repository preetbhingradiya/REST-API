const Post = require("../model/post-model.js")
const User = require("../model/user-mode.js")



//Create Post
const AddPost=async(req,res)=>{
    try {
        const newPost=await Post.create(req.body)
        res.status(200).json({success:true,newPost})
    } catch (error) {
        res.status(400).json({success:false,error})
    }
}

//update Post
const updatePost=async(req,res)=>{
    try {
        const id=req.params.id
        const post=await Post.findById(id)
        if(post.userId===req.body.userId){
            const update=await post.updateOne({$set:req.body})
            res.status(200).json({success:true,update})
        }
        else{
            res.status(403).json({success:false,message:"you can update only your post"})
        }
    } catch (error) {
        res.status(500).json({success:false,error})
    }
}

//delete Post
const deletePost=async(req,res)=>{
    try {
        const id=req.params.id
        const post=await Post.findById(id)
        if(post.userId===req.body.userId){
         await post.deleteOne()
            res.status(200).json({success:true,message:"post can be deleted"})
        }
        else{
            res.status(403).json({success:false,message:"you can delete only your post"})
        }
    } catch (error) {
        res.status(500).json({success:false,error})
    }
}

//like/dilike a post
const Like=async(req,res)=>{
    try {
        const like=await Post.findById(req.params.id)
        if(!like.likes.includes(req.body.userId)){
            await like.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("The post has been liked")
        }
        else{
            await like.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("The post has been disliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//get a post
const getPost=async(req,res)=>{
    try {
       const getPost=await Post.findById(req.params.id) 
       res.status(200).json({success:true,getPost})
    } catch (error) {
        res.status(500).json(error)
    }
}

//timeline
const timeLine=async(req,res)=>{
    try {
        const currentUser=await User.findById(req.body.userId)
        const userPosts=await Post.find({userId:currentUser._id})
        const friendPosts=await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId:friendId})
            })
        )
        res.json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={AddPost,updatePost,deletePost,Like,getPost,timeLine}