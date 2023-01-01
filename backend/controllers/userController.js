const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



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

    // Create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        
    })

    // If user created return info and token
    if (user) {
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
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

    // Deconstruct body
    const {email, password} = req.body
  
    // Does user exist - search by email
    const user = await User.findOne({email})

     // If user exists and password matches return info and token     
     if (user && (await bcrypt.compare(password,user.password))) {
        res.status(200).json({
            id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    } else {  // Error out
    res.status(401)
        throw new Error("Invalid credentials")
    }

  
})

// @desc Get user info
// @route /api/users
// @access Private

const getMe = asyncHandler( async(req,res) => {

    res.send("You got me")
})



// Generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

module.exports = {registerUser,
                loginUser,
                getMe}