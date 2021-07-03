const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

//Update user
router.put("/:id", async (req, res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin){

        if(req.body.password){
            try {
                const saltRounds = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, saltRounds)
            } catch (error) {
                res.status(500).json(error)
            }
        }

        try {
         const user =   await User.findByIdAndUpdate(req.body.userId,{$set:req.body})
          res.status(200).json("Account has been updated")
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        } 
    }else{
        res.status(403).json("You can update only your account")
    }
})

// Delete user
router.delete("/:id", async (req, res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin){

        try {
         const user =   await User.findByIdAndDelete(req.body.userId)
          res.status(200).json(`${user.username} has been Deleted`)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        } 
    }else{
        res.status(403).json("You can Delete only your account")
    }
})
// get a user
router.get("/:id", async (req, res) =>{

    try {
        const user =   await User.findById(req.body.userId)
        const {password, createdAt,isAdmin, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    } 
})
// follow a user
router.put("/:id/follow", async (req, res) =>{
    if(req.params.id !== req.body.userId){
        try {
            const user =   await User.findById(req.params.id)
            const currentUser =   await User.findById(req.body.userId)

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers : req.body.userId}})
                await currentUser.updateOne({$push:{followings : req.params.id}})
                res.status(200).json("User has been followed")
            }else{
                res.status(403).json("You already follow this user")
            }

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        } 
    }else{
        res.status(403).json("You can't follow yourself")
    }
   
})
// Unfollow a user
router.put("/:id/unfollow", async (req, res) =>{
    if(req.params.id !== req.body.userId){
        try {
            const user =   await User.findById(req.params.id)
            const currentUser =   await User.findById(req.body.userId)

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers : req.body.userId}})
                await currentUser.updateOne({$pull:{followings : req.params.id}})
                res.status(200).json("User has been unfollowed")
            }else{
                res.status(403).json("You don't follow this user")
            }

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        } 
    }else{
        res.status(403).json("You can't unfollow yourself")
    }
   
})

module.exports = router