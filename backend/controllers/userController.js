const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require("bcryptjs")



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

    // Check is user already exists in database
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    // Hash password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email
        })
    } else {
        res.status(400)
        throw new Error("Invalid user credentials")

    }
  

})







// @desc  Login user
// @route /api/users/login
// @access Public 

const loginUser = asyncHandler( async(req,res) => {
    res.send("Login User")
})

module.exports = {registerUser,
                loginUser}