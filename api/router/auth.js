const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')


router.post("/register", async(req, res) => {
    try {
        const saltRounds = await bcrypt.genSalt(10)
        const hashdPassword = await bcrypt.hash(req.body.password, saltRounds)
        req.body.password = hashdPassword

        const newUser = new User(req.body)
        const user = await newUser.save()
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})

        !user && res.status(404).json({msg:"User not found"})
        // console.log("body",user)
        const result = await bcrypt.compare(req.body.password, user.password)

        const {password, ...others} = user._doc
        result ? res.status(200).json(others) : res.status(403).json({mag: "Wrong password"})

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router