const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')



//create post
router.post("/",async(req,res) =>{
    const newPost = new Post(req.body)
    try {
        const post = await newPost.save()
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
//update a post
router.put("/:id",async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await Post.updateOne({$set:req.body})
            res.status(200).json("The post has been updated!")
        }else{
            res.status(403).json("You can update only your posts")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
//delete a post
router.delete("/:id",async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("The post has been Deleted!")
        }else{
            res.status(403).json("You can delete only your posts")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
// like a post
router.put("/:id/like",async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("The post has been Liked!")
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("The post has been Disliked!")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
// get a post
router.get("/:id",async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id)
        !post &&  res.status(403).json("No post found")
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
// get timeline posts(all posts of a use and his friends)
router.get("/timeline/all",async(req,res) =>{
    // console.log(req.body.userId)
    try {
        const currentUser = await User.findById(req.body.userId)
        const userPosts = await Post.find({userId:currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => Post.find({userId: friendId})
            )
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


module.exports = router