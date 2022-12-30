const mongoose = require("mongoose")

const userSchema = mongoose.model({
    name: {
        type:String,
        required: [true,"Please enter a name"]
    },

    email: { 
        type:String,
        required: [true,"Please enter an email"],
        unique: true
    },

    password: {
        type:String,
        required: [true,"Please enter a password"]

    },

    isAdmin: {
        type: Boolean,
        required:true,
        default:false
    }

     
})

module.exports = mongoose.model("User",userSchema)
