const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups:true
    },
    password: {
        type: String,
        required: true,
        min: 3
    },
    profilePic: {
        type: String,
        default: ""
    },
    coverPic: {
        type: String,
        default: ""
    }
    ,
    followings: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    desc:{
        type:String,
        max: 100
    },
    city:{
        type:String
    },
    from:{
        type:String
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)