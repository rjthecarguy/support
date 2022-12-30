const asyncHandler = require('express-async-handler')
const bcrypt = require("bcryptjs")
const User = require('../models/userModel')




// @desc Register new user
// @route /api/users
// @access Public 

const registerUser = asyncHandler( async(req,res) => {

    // Deconstruct data from body
    const {name, email, password } = req.body

    // Check for data, return error if not present
    if( !name || !email || !password) {
         res.status(400)
         throw new Error("Please include all fields")
    }

    const userExists = User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    // All good
    res.send("Register User")
})







// @desc  Login user
// @route /api/users/login
// @access Public 

const loginUser = asyncHandler( async(req,res) => {
    res.send("Login User")
})

module.exports = {registerUser,
                loginUser}